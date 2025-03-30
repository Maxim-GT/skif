// src/components/CustomCursor.tsx
import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isOverButton, setIsOverButton] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Проверяем, находится ли курсор над кнопкой, ссылкой или в навигации
        const target = e.target as HTMLElement;
        const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        Boolean(target.closest('button')) ||
        Boolean(target.closest('a')) ||
        Boolean(target.closest('nav')) ||
        Boolean(target.closest('.no-custom-cursor'));
    
        setIsOverButton(isInteractive);
    };

    // Функция, которая срабатывает, когда курсор входит в окно
    const handleMouseEnter = () => {
      // Здесь можно добавить логику при входе курсора (если требуется)
    };

    // Функция, которая срабатывает, когда курсор покидает окно
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Отключаем стандартный курсор в hero секции
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.style.cursor = 'none';
    }

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);

      // Восстанавливаем стандартный курсор при размонтировании
      if (heroSection) {
        heroSection.style.cursor = 'auto';
      }
    };
  }, []);

  // Отслеживаем, находится ли курсор в пределах hero секции
  useEffect(() => {
    const checkIfInHero = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const isInHero =
          position.x >= rect.left &&
          position.x <= rect.right &&
          position.y >= rect.top &&
          position.y <= rect.bottom;
        setIsVisible(isInHero);
      }
    };

    checkIfInHero();
    window.addEventListener('scroll', checkIfInHero);

    return () => {
      window.removeEventListener('scroll', checkIfInHero);
    };
  }, [position]);

  if (!isVisible) return null;

  return (
    <div
      className={`laser-dot ${isOverButton ? 'hidden' : ''}`}
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );
};

export default CustomCursor;
