
import React from 'react';

const YandexMapWidget = () => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg h-full w-full">
      <a 
        href="https://yandex.ru/maps/org/skif/44520002794/?utm_medium=mapframe&utm_source=maps" 
        className="text-skif-cream text-xs absolute top-0 left-2 z-10"
      >
        Скиф
      </a>
      <a 
        href="https://yandex.ru/maps/1095/abakan/category/further_education/184106162/?utm_medium=mapframe&utm_source=maps" 
        className="text-skif-cream text-xs absolute top-3.5 left-2 z-10"
      >
        Дополнительное образование в Абакане
      </a>
      <a 
        href="https://yandex.ru/maps/1095/abakan/category/shooting_club_shooting_range/184107317/?utm_medium=mapframe&utm_source=maps" 
        className="text-skif-cream text-xs absolute top-7 left-2 z-10"
      >
        Стрелковый клуб, тир в Абакане
      </a>
      <iframe 
        src="https://yandex.ru/map-widget/v1/org/skif/44520002794/?ll=91.399188%2C53.703976&z=17" 
        width="100%" 
        height="100%" 
        frameBorder="0" 
        allowFullScreen={true} 
        className="relative"
        title="Стрелковый клуб СКИФ на карте"
      ></iframe>
    </div>
  );
};

export default YandexMapWidget;