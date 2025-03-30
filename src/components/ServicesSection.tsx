import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
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
    // Trigger once on load
    revealOnScroll();
    
    return () => {
      window.removeEventListener('scroll', revealOnScroll);
    };
  }, []);

  const services = [
    {
      title: 'Образовательная программа «Гражданское оружие»',
      description: 'Персональные занятия с инструктором для совершенствования вашей техники и навыков стрельбы.',
      image: './weapons/civilian-weapon.png',
      price: '5500 ₽'
    },
    {
      title: 'Учебное занятие по практической стрельбе из пневматического пистолета «Юный стрелок»',
      description: 'Тренировки в группах до 5 человек — отличный способ улучшить навыки в компании единомышленников.',
      image: './weapons/youngShooter.png',
      price: '3500 ₽'
    },
    {
      title: 'Учебное занятие по практической стрельбе из пневматического пистолета для взрослых',
      description: 'Базовые курсы для тех, кто только начинает свой путь в мире стрелкового спорта.',
      image: './weapons/actionAirAdult.png',
      price: '4500 ₽'
    },
    {
      title: 'Курс базовых техник обращения с оружием для вступления в Федерацию Практической Стрельбы России БЕКОСО',
      description: 'Организация командных стрелковых мероприятий для сплочения коллектива вашей компании.',
      image: './weapons/federation.png',
      price: '22 500 ₽'
    },
    {
      title: 'Секция для детей и подростков «Практическая стрельба из пневматического пистолета Action air»',
      description: 'Организация командных стрелковых мероприятий для сплочения коллектива вашей компании.',
      image: '/weapons/actionAir.png',
      price: '3000 ₽'
    }
  ];

  return (
    <section id="services" ref={sectionRef} className="section-spacing bg-white reveal">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="w-20 h-1 bg-skif-gold mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Наши услуги</h2>
          <p className="text-lg text-skif-charcoal/80 max-w-3xl text-center">
            Мы предлагаем широкий спектр услуг для всех уровней подготовки — 
            от новичков до опытных стрелков
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-skif-offwhite rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div 
                className="aspect-[16/9] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${service.image})`
                }}
              ></div>
              <div className="p-8">
                <div className="mb-4">
                    <div className="flex flex-col">
                        <h3 className="text-xl font-semibold group-hover:text-skif-gold transition-colors line-clamp-2 min-h-[3.5rem]">
                          {service.title}
                        </h3>
                        <div className="text-skif-gold font-semibold mt-2">{service.price}</div>
                    </div>
                </div>
                <p className="text-skif-charcoal/70 mb-6">
                  {service.description}
                </p>
                <a href="#contact">
                  <Button className="w-full bg-skif-black hover:bg-skif-gold text-white transition-colors duration-300">
                    Забронировать
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold mb-6">Специальные предложения</h3>
          <div className="bg-skif-gold/10 p-8 md:p-12 rounded-lg border border-skif-gold/20">
            <h4 className="text-xl font-semibold mb-4">Абонементы на тренировки</h4>
            <p className="text-skif-charcoal/80 mb-8 max-w-3xl mx-auto">
              Приобретите абонемент на 3, 5 или 10 тренировок и получите существенную скидку.
              Абонементы действуют в течение 3 месяцев с момента приобретения.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                <h5 className="text-lg font-semibold mb-2 mt-8">3 тренировки</h5>
                <p className="text-skif-gold text-2xl font-bold mb-4">3000 ₽</p>
                <p className="text-sm text-skif-charcoal/60">Экономия 500 ₽</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                <h5 className="text-lg font-semibold mb-2 mt-8">5 тренировок</h5>
                <p className="text-skif-gold text-2xl font-bold mb-4">6000 ₽</p>
                <p className="text-sm text-skif-charcoal/60">Экономия 1500 ₽</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-skif-gold flex flex-col justify-between">
                <span className="text-xs uppercase font-bold text-white bg-skif-gold px-3 py-1 rounded-full mb-2 inline-block">Популярное</span>
                <h5 className="text-lg font-semibold mb-2">10 тренировок</h5>
                <p className="text-skif-gold text-2xl font-bold mb-4">11000 ₽</p>
                <p className="text-sm text-skif-charcoal/60">Экономия 4000 ₽</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
