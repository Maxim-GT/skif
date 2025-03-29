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

// POST-роут для отправки email с проверкой капчи
app.post('/send-email', async (req, res) => {
  const { name, phone, email, message, captcha } = req.body;

  // Проверяем, передан ли токен капчи
  if (!captcha) {
    console.error('Токен капчи не получен в запросе.');
    return res.status(400).json({ error: 'Капча не пройдена' });
  }

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

    // Логируем успешную валидацию капчи, если нужно
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

  // Если капча прошла проверку, продолжаем отправку письма
  const mailOptions = {
    from: 'glukhov_maxim@mail.ru',
    to: process.env.MAIL_RECEIVER, // Получатель из .env
    subject: `Новая заявка с сайта от ${name}`,
    text: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nСообщение: ${message}`,
    html: `<h2>Новая заявка с сайта</h2>
           <p><strong>Имя:</strong> ${name}</p>
           <p><strong>Телефон:</strong> ${phone}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Сообщение:</strong> ${message}</p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено:', info.response);
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
