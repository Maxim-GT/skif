
import React from 'react';
import { PhoneCall, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-skif-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold">СКИФ</span>
              <span className="ml-2 text-sm uppercase tracking-widest text-skif-gold">Стрелковый Клуб</span>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              Профессиональный стрелковый клуб в Абакане, предлагающий услуги для
              начинающих и опытных стрелков под руководством квалифицированных инструкторов.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://m.vk.com/club220666580"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-skif-gold transition-colors duration-300"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.695-1.253.695-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.847 2.44 2.274 4.574 2.862 4.574.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.743c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.15-3.574 2.15-3.574.119-.254.373-.491.779-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.745-.576.745z"/>
                </svg>
              </a>
              <a
                href="https://t.me/SKifHakasia"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-skif-gold transition-colors duration-300"
              >
                  <img src="/tgwhite.svg" alt="Telegram" className="h-5 w-5" />

              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Навигация</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-skif-gold transition-colors">Главная</a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-skif-gold transition-colors">О нас</a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-skif-gold transition-colors">Услуги</a>
              </li>
              <li>
                <a href="#weapons" className="text-white/70 hover:text-skif-gold transition-colors">Оружие</a>
              </li>
              <li>
                <a href="#gallery" className="text-white/70 hover:text-skif-gold transition-colors">Галерея</a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-skif-gold transition-colors">Контакты</a>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-white/70 hover:text-skif-gold transition-colors">Политика конфиденциальности</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <PhoneCall className="h-5 w-5 text-skif-gold mr-3" />
                <span className="text-white/70">+7 (913) 440-37-72</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-skif-gold mr-3" />
                <span className="text-white/70">info@skif-club.ru</span>
              </li>
              <li className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-skif-gold mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white/70">
                  г. Абакан, ул. Пирятинская, 26А,<br />
                  Республика Хакасия, 655017
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          <p>© {currentYear} Стрелковый клуб СКИФ. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
