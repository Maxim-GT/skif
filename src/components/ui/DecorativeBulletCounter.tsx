import React from 'react';

interface DecorativeBulletCounterProps {
  totalCount: number;
  yearlyCount: number;
  className?: string; // Добавляем возможность передавать кастомные стили
}

const DecorativeBulletCounter: React.FC<DecorativeBulletCounterProps> = ({ 
  totalCount, 
  yearlyCount, 
  className = '' // По умолчанию пустая строка, если класс не передан
}) => {
  const formatNumber = (num: number): string => num.toString().padStart(7, '0');
  
  const totalDigits = formatNumber(totalCount).split('');
  const yearlyDigits = formatNumber(yearlyCount).split('');
  const year = new Date().getFullYear();

  return (
    <div className={`w-[100vw] lg:w-[calc(100vw - 5px)] fixed bottom-0 left-0 right-0 z-20 bg-skif-black/80 backdrop-blur-sm border-t border-skif-gold/30 py-3 px-4 transition-opacity duration-1000 ${className}`}>
      <div className="flex flex-col items-center justify-center text-center">
        {/* Внешний контейнер, отцентрированный относительно экрана */}
        <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row lg:justify-evenly gap-4">
          
          {/* Всего выстрелов */}
          <div className="flex items-center gap-0 lg:gap-3">
            <div className="text-skif-gold font-medium text-sm lg:text-lg whitespace-nowrap">
              ВСЕГО ВЫСТРЕЛОВ:
            </div>
            {/* Группа цифр, выровненная по правому краю */}
            <div className="flex justify-end flex-1">
              {totalDigits.map((digit, index) => (
                <div 
                  key={`total-${index}`}
                  className="mx-[1px] bg-skif-charcoal/80 rounded-md w-6 h-8 flex items-center justify-center"
                >
                  <span className="text-skif-gold font-bold text-sm lg:text-lg">{digit}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* За текущий год */}
          <div className="flex items-center gap-0 lg:gap-3">
            <div className="text-skif-gold font-medium text-sm lg:text-lg whitespace-nowrap">
              ЗА {year} ГОД:
            </div>
            {/* Группа цифр, выровненная по правому краю */}
            <div className="flex justify-end flex-1">
              {yearlyDigits.map((digit, index) => (
                <div 
                  key={`yearly-${index}`}
                  className="mx-[1px] bg-skif-charcoal/80 rounded-md w-6 h-8 flex items-center justify-center"
                >
                  <span className="text-skif-gold font-bold text-sm lg:text-lg">{digit}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DecorativeBulletCounter;
