import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = ({ initialColor = 'white' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getTextColorClass = () => {
    if (isMenuOpen || isScrolled) return 'text-skif-black';
    return initialColor === 'black' ? 'text-skif-black' : 'text-white';
  };

  const textColorClass = getTextColorClass();

  return (
    <nav 
      style={isDesktop ? { width: 'calc(100vw - 5px)' } : {}}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isMenuOpen || isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="/#" className="flex items-center">
            <span className={`text-2xl font-bold ${textColorClass}`}>
              СКИФ
            </span>
            <span className="ml-2 text-sm uppercase tracking-widest text-skif-gold">
              Спортивный Клуб
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#about" className={`hover:text-skif-gold ${textColorClass}`}>О нас</a>
            <a href="/#services" className={`hover:text-skif-gold ${textColorClass}`}>Услуги</a>
            <a href="/#weapons" className={`hover:text-skif-gold ${textColorClass}`}>Оружие</a>
            <a href="/#gallery" className={`hover:text-skif-gold ${textColorClass}`}>Галерея</a>
            <a href="/#contact" className={`hover:text-skif-gold ${textColorClass}`}>Контакты</a>
            <a href="https://m.vk.com/club220666580" target="_blank" rel="noopener noreferrer">
              <Button className="bg-skif-gold hover:bg-skif-darkGold text-white rounded-md">
                VK Группа
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 focus:outline-none ${textColorClass}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 pb-6">
            {['О нас', 'Услуги', 'Оружие', 'Галерея', 'Контакты'].map((text, index) => (
              <a 
                key={index} 
                href={`/#${text.toLowerCase()}`} 
                className="px-4 py-2 text-skif-black hover:text-skif-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {text}
              </a>
            ))}
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
