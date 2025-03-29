import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Modal from './ui/photoModal';

const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
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
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const images = [
    './public/5.webp',
    './public/2.webp',
    './public/3.webp',
    './public/4.webp',
    './public/1.webp',
    './public/6.webp',
    './public/7.webp',
    './public/8.webp'
  ];

  return (
    <section id="gallery" ref={sectionRef} className="section-spacing bg-skif-black reveal">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="w-20 h-1 bg-skif-gold mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">Галерея</h2>
          <p className="text-lg text-white/80 max-w-3xl text-center">
            Погрузитесь в атмосферу нашего стрелкового клуба через фотографии наших объектов, 
            мероприятий и тренировок
          </p>
        </div>

        {/* Галерея: 2 колонки на мобильных, 4 на больших экранах */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group transform transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => setSelectedImage(image)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                <p className="text-sm font-light">Стрелковый клуб СКИФ</p>
                <p className="text-xs text-white/70">Абакан</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно с изображением */}
      {selectedImage && (
        <Modal 
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

export default GallerySection;