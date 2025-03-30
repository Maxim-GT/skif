import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';
import { sendEmail, EmailFormData } from '@/utils/sendEmail';
import YandexMapWidget from './YandexMapWidget';
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Link } from "react-router-dom";

const ContactForm = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hcaptchaRef = useRef<HCaptcha>(null);
  
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<EmailFormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const revealOnScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('active');
      }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    return () => {
      window.removeEventListener('scroll', revealOnScroll);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      let sanitizedValue = value.replace(/[^\d+]/g, '');
      if (sanitizedValue.startsWith('8')) {
        sanitizedValue = '+7' + sanitizedValue.slice(1);
      }
      const digitCount = sanitizedValue.replace(/\D/g, '').length;
      if (digitCount > 11) return;
      
      setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!captchaToken) {
      toast.error("Пожалуйста, подтвердите, что вы не робот.");
      setIsSubmitting(false);
      return;
    }

    try {
      const submissionData = { ...formData, captcha: captchaToken };
      console.log('Отправка данных формы:', submissionData);
      const success = await sendEmail(submissionData);
      
      if (success) {
        toast.success('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
        setFormData({ name: '', phone: '', email: '', message: '' });
        setCaptchaToken(null);
        if (hcaptchaRef.current) {
          hcaptchaRef.current.resetCaptcha();
        }
      } else {
        throw new Error('Ошибка при отправке');
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      toast.error('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <a href="tel:+79134403772" className="cursor-pointer">
          <Phone className="h-5 w-5 text-skif-gold transition-transform transform hover:scale-110" />
        </a>
      ),
      title: 'Телефон',
      details: (
        <a href="tel:+79134403772" className="text-skif-charcoal/70 hover:text-skif-gold transition cursor-pointer">
          +7 (913) 440-37-72
        </a>
      )
    },
    {
      icon: (
        <a href="mailto:info@skif-club.ru" className="cursor-pointer">
          <Mail className="h-5 w-5 text-skif-gold transition-transform transform hover:scale-110" />
        </a>
      ),
      title: 'Email',
      details: (
        <a href="mailto:info@skif-club.ru" className="text-skif-charcoal/70 hover:text-skif-gold transition cursor-pointer">
          info@skif-club.ru
        </a>
      )
    },
    {
      icon: (
        <a href="https://t.me/SKifHakasia" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
          <img src="./public/telegram-icon2.svg" alt="Telegram" className="h-5 w-5 transition-transform transform hover:scale-110" />
        </a>
      ),
      title: 'Telegram',
      details: (
        <a 
          href="https://t.me/SKifHakasia"
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-skif-charcoal/70 hover:text-skif-gold transition cursor-pointer"
        >
          @SKifHakasia
        </a>
      ),
    },
    {
      icon: <MapPin className="h-5 w-5 text-skif-gold" />,
      title: 'Адрес',
      details: 'г. Абакан, ул. Пирятинская, 26А'
    },
    {
      icon: <Clock className="h-5 w-5 text-skif-gold" />,
      title: 'Часы работы',
      details: 'Пн-Пт: 10:00 - 20:00, Сб-Вс: 12:00 - 18:00'
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-spacing bg-skif-offwhite reveal">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="w-20 h-1 bg-skif-gold mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Связаться с нами</h2>
          <p className="text-lg text-skif-charcoal/80 max-w-3xl text-center">
            Оставьте заявку и мы свяжемся с вами для записи на тренировку или ответим на ваши вопросы
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-8 pb-3 rounded-lg shadow-lg h-full flex flex-col">
            <h3 className="text-2xl font-semibold mb-6">Оставить заявку</h3>
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="space-y-6 flex-1">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-skif-charcoal mb-1">
                    Имя
                  </label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Ваше имя" 
                    required 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-skif-charcoal mb-1">
                    Телефон
                  </label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="+7 (___) ___-__-__" 
                    required 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-skif-charcoal mb-1">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="example@email.com" 
                    required 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-skif-charcoal mb-1">
                    Сообщение
                  </label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Ваше сообщение или вопрос" 
                    rows={3} 
                    className="w-full"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col items-center">
                <HCaptcha
                  sitekey="fe98a46c-645a-4448-821e-e9a4796e6a5c"
                  onVerify={handleCaptchaVerify}
                  ref={hcaptchaRef}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-skif-gold hover:bg-skif-darkGold text-white h-12 flex items-center justify-center gap-2 mt-4"
                disabled={isSubmitting || !captchaToken}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Отправка...
                  </span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Отправить заявку
                  </>
                )}
              </Button>
              {/* Маленькая надпись под кнопкой */}
              <p className="mt-2 text-xs text-left text-skif-charcoal/70">
                Нажимая кнопку «Отправить заявку», вы соглашаетесь с 
                <Link to="/privacy-policy" className="text-skif-gold hover:underline"> политикой конфиденциальности
                </Link>
              </p>
            </form>
          </div>
          
          <div className="bg-white lg:pb-[36px] p-8 rounded-lg shadow-lg h-full flex flex-col">
            <h3 className="text-2xl font-semibold mb-6">Контактная информация</h3>
            <div className="space-y-6 flex-1 flex flex-col justify-center lg:justify-around lg:pt-2 lg:pb-3 lg:mb-8 pt-2 pb-4 md:pt-10 md:pb-15">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="p-3 bg-skif-cream rounded-full mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg">{item.title}</h4>
                    <p className="text-skif-charcoal/70 text-base">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <a href="https://m.vk.com/club220666580" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Button variant="outline" className="w-full h-12 border-skif-gold text-skif-gold hover:bg-skif-gold hover:text-white transition-all duration-300">
                  Связаться через VK
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-lg h-[400px] overflow-hidden">
          <YandexMapWidget />
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
