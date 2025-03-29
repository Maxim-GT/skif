import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isMenuOpen && isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3 pt-3'  // Паддинг сверху только когда меню открыто и страница прокручена
          : isMenuOpen
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3 pt-5'   // Паддинг сверху при открытом меню, но без прокрутки
          : isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <span className={`text-2xl font-bold ${isMenuOpen || isScrolled ? 'text-skif-black' : 'text-white'}`}>
              СКИФ
            </span>
            <span className={`ml-2 text-sm uppercase tracking-widest ${isMenuOpen || isScrolled ? 'text-skif-gold' : 'text-skif-gold'}`}>
              Спортивный Клуб
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className={`transition-colors hover:text-skif-gold ${isScrolled ? 'text-skif-black' : 'text-white'}`}>О нас</a>
            <a href="#services" className={`transition-colors hover:text-skif-gold ${isScrolled ? 'text-skif-black' : 'text-white'}`}>Услуги</a>
            <a href="#weapons" className={`transition-colors hover:text-skif-gold ${isScrolled ? 'text-skif-black' : 'text-white'}`}>Оружие</a>
            <a href="#gallery" className={`transition-colors hover:text-skif-gold ${isScrolled ? 'text-skif-black' : 'text-white'}`}>Галерея</a>
            <a href="#contact" className={`transition-colors hover:text-skif-gold ${isScrolled ? 'text-skif-black' : 'text-white'}`}>Контакты</a>
            <Button className="bg-skif-gold hover:bg-skif-darkGold text-white rounded-md">
              <a href="https://m.vk.com/club220666580" target="_blank" rel="noopener noreferrer">
                VK Группа
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 focus:outline-none ${isMenuOpen || isScrolled ? 'text-skif-black' : 'text-white'}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6`} />
            ) : (
              <Menu className={`w-6 h-6`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 pb-6">
            <a 
              href="#about" 
              className="px-4 py-2 text-skif-black hover:text-skif-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              О нас
            </a>
            <a 
              href="#services" 
              className="px-4 py-2 text-skif-black hover:text-skif-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Услуги
            </a>
            <a 
              href="#weapons" 
              className="px-4 py-2 text-skif-black hover:text-skif-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Оружие
            </a>
            <a 
              href="#gallery" 
              className="px-4 py-2 text-skif-black hover:text-skif-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Галерея
            </a>
            <a 
              href="#contact" 
              className="px-4 py-2 text-skif-black hover:text-skif-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Контакты
            </a>
            <Button className="bg-skif-gold hover:bg-skif-darkGold text-white rounded-md">
              <a 
                href="https://m.vk.com/club220666580" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                VK Группа
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
