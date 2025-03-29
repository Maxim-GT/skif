
import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-skif-black"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1669729828193-147aad39fa63?q=80&w=1920&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Decorative Mongolian pattern border */}
      <div className="absolute inset-0 border-[10px] border-transparent mongolian-pattern-border opacity-30"></div>
      
      <div className="container mx-auto px-4 text-center z-10">
        <div 
          className={`transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Спортивный клуб <span className="text-skif-gold">СКИФ</span>
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-300 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Профессиональный стрелковый клуб в Абакане, где каждый может освоить 
            искусство стрельбы в безопасной и комфортной обстановке
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-500 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Button className="bg-skif-gold hover:bg-skif-darkGold text-white px-8 py-6 rounded-md text-lg shadow-gold">
              <a href="#contact">Записаться</a>
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 rounded-md text-lg">
              <a href="#services">Узнать больше</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce transition-all duration-1000 delay-700 ${
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
