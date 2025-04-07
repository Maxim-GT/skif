
import React, { useEffect, useRef } from 'react';
import { Shield, Target, Award, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  
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

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-skif-gold" />,
      title: 'Безопасность',
      description: 'Все тренировки проходят под наблюдением квалифицированных инструкторов с соблюдением строгих мер безопасности.'
    },
    {
      icon: <Target className="h-8 w-8 text-skif-gold" />,
      title: 'Профессиональное оборудование',
      description: 'Наш клуб оснащен современным стрелковым оборудованием, мишенями и системами безопасности.'
    },
    {
      icon: <Award className="h-8 w-8 text-skif-gold" />,
      title: 'Опытные инструкторы',
      description: 'Наши инструкторы имеют большой опыт и международные сертификаты в области стрелковой подготовки.'
    },
    {
      icon: <Users className="h-8 w-8 text-skif-gold" />,
      title: 'Для всех уровней',
      description: 'Мы предлагаем программы для начинающих и опытных стрелков, индивидуальные и групповые занятия.'
    }
  ];

  const renderFeatures = () => {
    if (isMobile) {
      return (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {features.map((feature, index) => (
              <CarouselItem key={index} className="pl-2 basis-[85%]">
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group h-full">
                  <div className="p-4 rounded-full bg-skif-cream mb-6 inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-skif-gold transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-skif-charcoal/70">
                    {feature.description}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6">
            <CarouselPrevious className="relative static mx-2 left-0 translate-y-0" />
            <CarouselNext className="relative static mx-2 right-0 translate-y-0" />
          </div>
        </Carousel>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="p-4 rounded-full bg-skif-cream mb-6 inline-block">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-4 group-hover:text-skif-gold transition-colors">
              {feature.title}
            </h3>
            <p className="text-skif-charcoal/70">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <section id="about" ref={sectionRef} className="section-spacing bg-skif-offwhite reveal">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="w-20 h-1 bg-skif-gold mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">О стрелковом клубе СКИФ</h2>
          <p className="text-base lg:text-lg text-skif-charcoal/80 max-w-3xl text-center">
            Стрелковый клуб СКИФ — это современный центр для обучения и практики стрелкового искусства в Абакане,
            где безопасность и профессионализм являются нашими главными приоритетами.
          </p>
        </div>

        {renderFeatures()}            
        
        <div className="mt-14 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col lg:flex-row">
            <div 
              className="w-full lg:w-1/2 h-64 lg:h-auto bg-contain bg-top bg-no-repeat bg-white"
              style={{ backgroundImage: 'url("./logo2.webp")' }}
            ></div>
            <div className="bg-skif-black w-full lg:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Наша философия</h3>
              <div className="w-16 h-1 bg-skif-gold mb-6"></div>
              <p className="text-white/80 mb-6 leading-relaxed">
                В СКИФ мы верим, что стрельба — это не просто спорт, но и искусство, требующее дисциплины, 
                концентрации и постоянного совершенствования. Наша цель — создать сообщество 
                единомышленников, где каждый может развивать свои навыки в дружественной и профессиональной среде.
              </p>
              <p className="text-white/80 leading-relaxed">
                Мы гордимся нашими традициями и стремимся сохранять высокие стандарты в обучении стрельбе, 
                делая это искусство доступным для всех желающих в Абакане и Хакасии.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
