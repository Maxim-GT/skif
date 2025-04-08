import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

// Компонент мобильного слайдера с точками
const MobileSlider = ({ offers }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // При клике на точку скроллим контейнер до нужного слайда
  const handleDotClick = (index: number) => {
    const container = containerRef.current;
    if (container) {
      const slideWidth = container.offsetWidth;
      container.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
      setActiveSlide(index);
    }
  };

  // При скролле определяем активный слайд
  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const slideWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      
      // Если мы близки к максимальному скроллу, считаем что это последний слайд
      if (Math.abs(scrollLeft - maxScrollLeft) < 20) {
        setActiveSlide(offers.length - 1);
      } else {
        // Иначе вычисляем индекс нормально
        const index = Math.round(scrollLeft / slideWidth);
        setActiveSlide(index);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      {/* Контейнер слайдера с улучшенной визуализацией */}
      <div
        className="md:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        ref={containerRef}
        style={{ touchAction: 'pan-x', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-4 px-4">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-lg flex flex-col justify-end lg:justify-between min-w-[85%] snap-start transition-all duration-300 ${
                offer.popular ? 'border-2 border-skif-gold shadow-gold' : 'border border-gray-100'
              }`}
            >
              {offer.popular && (
                <div className="text-center">
                  <span className="text-xs uppercase font-bold text-white bg-skif-gold px-3 py-1 rounded-full inline-block shadow-md">
                    Популярное
                  </span>
                </div>
              )}
              <div className="flex flex-col items-center mt-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  offer.popular ? 'bg-skif-gold/20' : 'bg-gray-100'
                }`}>
                  <span className="text-xl font-bold">{offer.title.split(' ')[0]}</span>
                </div>
                <h5 className="text-xl font-semibold mb-2 text-center">{offer.title}</h5>
                <div className="my-4 w-12 h-1 bg-skif-gold/50 rounded-full"></div>
                <p className="text-skif-gold text-3xl font-bold mb-1">{offer.price}</p>
                <p className="text-sm text-skif-charcoal/60 mb-4">{offer.saving}</p>
                <a href="#contact">
                  <Button variant="outline" className={`mt-auto w-full border-skif-gold text-skif-gold hover:bg-skif-gold hover:text-white transition-all`}>
                    Мне подходит
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Улучшенные точки для навигации */}
      <div className="flex justify-center mt-4 md:hidden">
        {offers.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
              activeSlide === index 
                ? 'bg-skif-gold scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Перейти к слайду ${index + 1}`}
          ></button>
        ))}
      </div>
    </>
  );
};

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

  // Данные специальных предложений для слайдера
  const specialOffers = [
    {
      title: '3 тренировки',
      price: '3000 ₽',
      saving: 'Экономия 500 ₽',
      popular: false
    },
    {
      title: '5 тренировок',
      price: '6000 ₽',
      saving: 'Экономия 1500 ₽',
      popular: false
    },
    {
      title: '10 тренировок',
      price: '11000 ₽',
      saving: 'Экономия 4000 ₽',
      popular: true
    }
  ].reverse();

  return (
    <section id="services" ref={sectionRef} className="section-spacing bg-white reveal">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="w-20 h-1 bg-skif-gold mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Наши услуги</h2>
          <p className="text-base lg:text-lg text-skif-charcoal/80 max-w-3xl text-center">
            Мы предлагаем широкий спектр услуг для всех уровней подготовки — от новичков до опытных стрелков
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
                style={{ backgroundImage: `url(${service.image})` }}
              ></div>
              <div className="p-8">
                <div className="mb-4">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold group-hover:text-skif-gold transition-colors line-clamp-4 min-h-[3.5rem]">
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

        {/* Улучшенный блок специальных предложений */}
        <div className="mt-20">
          <div className="bg-skif-gold/15 p-8 md:p-12 rounded-xl border border-skif-gold/20 shadow-lg relative overflow-hidden">
            {/* Декоративные элементы */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-skif-gold/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-skif-gold/10 rounded-full blur-2xl"></div>
            <div className="absolute inset-0 mongolian-pattern-border opacity-10"></div>
            <div className="relative z-10">
              <div className="w-20 h-1 bg-skif-gold mx-auto mb-4"></div>
              <h4 className="text-2xl md:text-2xl font-semibold mb-4 text-center">Абонементы на тренировки</h4>
              <p className="text-skif-charcoal/80 mb-8 max-w-3xl mx-auto text-center text-base lg:text-lg">
                Приобретите абонемент на 3, 5 или 10 тренировок и получите существенную скидку.
                Абонементы действуют в течение 3 месяцев с момента приобретения.
              </p>

              {/* Мобильный слайдер с улучшенной анимацией */}
              <MobileSlider offers={specialOffers} />

              {/* Улучшенное отображение для десктопа */}
              <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-6">
                {specialOffers.map((offer, index) => (
                  <Card 
                    key={index} 
                    className={`relative w-full md:w-64 h-auto p-1 ${
                      offer.popular 
                        ? 'bg-gradient-to-br from-skif-gold/80 via-skif-gold/50 to-skif-gold/30 shadow-gold' 
                        : 'bg-white border border-gray-100 hover:border-skif-gold/30'
                    } transition-all duration-300 hover:shadow-xl group`}
                  >
                    <CardContent className={`bg-white rounded-md p-6 h-full ${offer.popular ? 'border-2 border-skif-gold/20' : ''}`}>
                      {offer.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="text-xs uppercase font-bold text-white bg-skif-gold px-3 py-1 rounded-full inline-block shadow-md">
                            Популярное
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col items-center pt-4">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                          offer.popular ? 'bg-skif-gold/20' : 'bg-gray-100'
                        } group-hover:scale-110 transition-all duration-300`}>
                          <span className="text-2xl font-bold">{offer.title.split(' ')[0]}</span>
                        </div>
                        <h5 className="text-xl font-semibold mb-3 text-center">{offer.title}</h5>
                        <div className="my-4 w-16 h-1 bg-skif-gold/50 rounded-full"></div>
                        <p className={`text-3xl font-bold mb-1 ${offer.popular ? 'text-skif-gold' : 'text-skif-gold group-hover:text-skif-gold'}`}>
                          {offer.price}
                        </p>
                        <p className="text-sm text-skif-charcoal/60 mb-6">{offer.saving}</p>
                        <a href="#contact">
                          <Button 
                            variant={offer.popular ? "default" : "outline"} 
                            className={`mt-auto w-full ${
                              offer.popular 
                                ? 'bg-skif-gold hover:bg-skif-gold/90 text-white' 
                                : 'border-skif-gold text-skif-gold hover:bg-skif-gold hover:text-white'
                            } transition-all`}
                          >
                            Мне подходит
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;