import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import WeaponModal from './ui/weaponModal';

interface Weapon {
  id: number;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
}

const weaponsData: Weapon[] = [
  {
    id: 1,
    name: "Карабин Сайга",
    shortDescription: "Учебное занятие, \n 1500 р.",
    fullDescription: "Надежное и проверенное временем оружие с минимальной отдачей. Подходит как для начинающих, так и для опытных стрелков.",
    image: "./weapons/saiga.png"
  },
  {
    id: 2,
    name: "Карабин Сайга 410",
    shortDescription: "Учебное занятие,\n 1500 р.",
    fullDescription: "Компактный и удобный пистолет с отличной эргономикой. Идеальный выбор для отработки базовых навыков стрельбы.",
    image: "./weapons/saiga410.png"
  },
  {
    id: 3,
    name: "Пулевая стрельба 50м",
    shortDescription: "Учебное занятие, \n 3500 р.",
    fullDescription: "Мощное полуавтоматическое ружье с минимальной отдачей благодаря газоотводной системе. Отличный выбор для динамической стрельбы.",
    image: "./weapons/50m.png"
  },
  {
    id: 4,
    name: "Первый выстрел «Викинг»",
    shortDescription: "Учебное занятие, \n 3000 р.",
    fullDescription: "Надежное полуавтоматическое ружье с возможностью быстрой перезарядки. Подходит для спортивной и практической стрельбы.",
    image: "./weapons/viking.png"
  },
  {
    id: 5,
    name: "Первый выстрел «ПМ»",
    shortDescription: "Учебное занятие, \n 3000 р.",
    fullDescription: "Пистолет с двухрядным магазином и высокой точностью. Популярен среди спортсменов благодаря надежности и эргономике.",
    image: "./weapons/pm.png"
  },
  {
    id: 6,
    name: "Боевой пистолет «V.I.P.»",
    shortDescription: "Учебное занятие, \n 4000 р.",
    fullDescription: "Один из самых распространенных пистолетов в мире. Надежный, точный и с большой емкостью магазина.",
    image: "./weapons/vip2.png"
  },
  {
    id: 7,
    name: "Боевой пистолет «V.I.P.»",
    shortDescription: "Учебное занятие, \n 4000 р.",
    fullDescription: "Самозарядный карабин с высокой надежностью в различных условиях. Подходит для практической стрельбы.",
    image: "./weapons/vip.png"
  },
  {
    id: 8,
    name: "Пневматический пистолет",
    shortDescription: "Учебное занятие, \n 3500 р.",
    fullDescription: "Легендарная снайперская винтовка с отличной точностью. Возможность поражать цели на больших дистанциях.",
    image: "./weapons/youngShooter.png"
  }
];

const WeaponsSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);

  const handleOpenDialog = (weapon: Weapon) => {
    setSelectedWeapon(weapon);
    setOpen(true);
  };

  const scrollToContact = () => {
    setOpen(false);
    setTimeout(() => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <section id="weapons" className="section-spacing bg-skif-offwhite reveal">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="w-20 h-1 bg-skif-gold mb-6"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">Наше оружие</h2> {/* Изменён размер шрифта */}
          <p className="text-lg text-skif-charcoal/80 max-w-3xl text-center">
            В нашем тире представлено разнообразное оружие для любого уровня подготовки.
            Выберите то, что вам интересно!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {weaponsData.map((weapon) => (
            <div
              key={weapon.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
            >
              <img
                src={weapon.image}
                alt={weapon.name}
                className="w-full h-auto object-contain"
              />
              <div className="p-4 sm:p-4 md:p-5 flex flex-col flex-grow">
                <h3 className="text-sm sm:text-xl md:text-2xl font-semibold mb-2 group-hover:text-skif-gold transition-colors">
                  {weapon.name}
                </h3> {/* Изменён размер шрифта для заголовков */}
                <p className="text-sm text-skif-charcoal/70 mb-4 flex-grow whitespace-pre-line">
                  {weapon.shortDescription}
                </p>
                <Button 
                  className="w-full mx-auto bg-skif-black hover:g-skif-gold text-white transition-colors duration-300 whitespace-normal"
                  onClick={() => handleOpenDialog(weapon)}
                >
                  Хочу попробовать
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <WeaponModal 
        weapon={selectedWeapon} 
        open={open} 
        onClose={() => setOpen(false)} 
        onAction={scrollToContact}
      />
    </section>
  );
};

export default WeaponsSection;
