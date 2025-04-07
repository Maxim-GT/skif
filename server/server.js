// Подключаем dotenv для загрузки переменных окружения из файла .env
import 'dotenv/config';

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import fetch from 'node-fetch'; // Для вызова API hCaptcha

const app = express();
app.use(express.json());
app.use(cors());

// Настройка транспортера для Mail.ru с использованием переменных окружения
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true, // true для SSL (порт 465)
  auth: {
    user: process.env.MAIL_USER, // Логин из .env
    pass: process.env.MAIL_PASS  // Пароль из .env
  }
});

app.post('/send-email', async (req, res) => {
  const { name, phone, email, message, captcha } = req.body;

  // Определяем, что это заявка со скидкой по наличию маркера
  const isDiscountRequest = message && message.includes('[Скидка]');

  // Если капча не передана и это не заявка со скидкой — возвращаем ошибку
  if (!captcha && !isDiscountRequest) {
    console.error('Токен капчи не получен в запросе.');
    return res.status(400).json({ error: 'Капча не пройдена' });
  }

  // Если заявка со скидкой, но капча не передана — пропускаем проверку
  if (!captcha && isDiscountRequest) {
    console.log('Заявка со скидкой: пропускаем проверку капчи');
  } else {
    // Верифицируем капчу через API hCaptcha
    try {
      const params = new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET || '',
        response: captcha,
      });

      const verifyResponse = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      });
      const verifyData = await verifyResponse.json();

      if (verifyData.success) {
        console.log('hCaptcha прошла успешную валидацию');
      } else {
        console.error('Ошибка при верификации капчи:', verifyData);
        return res.status(400).json({ error: 'Ошибка проверки капчи' });
      }
    } catch (error) {
      console.error('Ошибка при верификации капчи:', error);
      return res.status(500).json({ error: 'Ошибка при верификации капчи' });
    }
  }

  // Формирование письма для получателя
  const mainMailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_RECEIVER,
    subject: `Новая заявка с сайта от ${name}`,
    text: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nСообщение: ${message}`,
    html: `<h2>Новая заявка с сайта</h2>
           <p><strong>Имя:</strong> ${name}</p>
           <p><strong>Телефон:</strong> ${phone}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Сообщение:</strong> ${message}</p>`
  };

  try {
    const info = await transporter.sendMail(mainMailOptions);
    console.log('Письмо отправлено:', info.response);

    // Формирование письма для подтверждения клиенту
    if (email) {
      const clientMailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Спасибо за вашу заявку!',
        text: 'Благодарим за оформление заявки. Мы свяжемся с вами в ближайшее время.',
        html: `<h2>Спасибо за вашу заявку!</h2>
              <p>Мы свяжемся с вами в ближайшее время.</p>`
    };

    const clientInfo = await transporter.sendMail(clientMailOptions);
    console.log('Письмо подтверждения клиенту отправлено:', clientInfo.response);
     } else {
    console.log('Email не указан — письмо подтверждения не отправляется');
  }
      

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
