import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CustomCursor from './CustomCursor';
import DecorativeBulletCounter from './ui/DecorativeBulletCounter';

const HeroSection = () => {
  const initialTotal = 10234;
  const initialYearly = 5658;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShimmering, setIsShimmering] = useState(false);
  const [isCounterVisible, setIsCounterVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Определяем, сенсорное ли устройство и добавляем класс в body
  useEffect(() => {
    const isTouchDevice = () => (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );
  
    if (isTouchDevice()) {
      document.body.classList.add('touch-device');
    } else {
      document.body.classList.remove('touch-device');
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShimmering(true);
      const interval = setInterval(() => {
        setIsShimmering(false);
        setTimeout(() => setIsShimmering(true), 100);
      }, 4000);
      return () => clearInterval(interval);
    }, 1500);

    const counterTimeout = setTimeout(() => {
      setIsCounterVisible(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(counterTimeout);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        if (window.scrollY > 50) {
          setIsCounterVisible(false);
        } else {
          setIsCounterVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setIsLoaded(true);
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-skif-black shooting-area"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1669729828193-147aad39fa63?q=80&w=1920&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 border-[10px] border-transparent mongolian-pattern-border opacity-30"></div>

      <CustomCursor />

      <DecorativeBulletCounter
        totalCount={initialTotal}
        yearlyCount={initialYearly}
        className={`transition-opacity duration-1000 ${isCounterVisible ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="container mx-auto px-4 text-center z-10 mb-16">
        <div
          className={`flex flex-col items-center gap-3 transition-all duration-1000 ease-out
                      will-change-opacity will-change-transform mt-[7vh]
                      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <img
            src="./logo3.webp"
            alt="Логотип Скриф"
            className="w-[5rem] lg:w-[12rem] sm:mb-5 mb-0"
            onLoad={handleImageLoad}
          />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-0 lg:mb-6 tracking-tight leading-tight">
            Спортивный клуб{" "}
            <span className="relative shimmer-container inline-block">
              <span className="gold-text-gradient text-mask">СКИФ</span>
              <span className={`shimmer-effect ${isShimmering ? 'shimmer-active' : ''}`}></span>
            </span>
          </h1>

          <p
            className={`text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-4 lg:mb-8 transition-all duration-1000 ease-out
                        will-change-opacity will-change-transform
                        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            Профессиональный стрелковый клуб в Абакане – искусство стрельбы в безопасной и комфортной обстановке
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ease-out
                        will-change-opacity will-change-transform
                        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <Button className="w-[12rem] sm:w-auto bg-skif-gold hover:bg-skif-darkGold text-white px-8 py-6 rounded-md text-lg shadow-gold">
              <a href="#contact">Записаться</a>
            </Button>
            <Button variant="outline" className="w-[12rem] sm:w-auto bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 rounded-md text-lg">
              <a href="#services">Узнать больше</a>
            </Button>
          </div>
        </div>
      </div>

      <div 
        className={`transform -translate-x-1/2 cursor-pointer animate-bounce transition-all duration-1000 delay-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={scrollToAbout}
      >
        <ArrowDown className="text-white h-10 w-10" />
      </div>
    </section>
  );
};

export default HeroSection;
