import React, { useState, useEffect } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingSocialButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div
      className="fixed bottom-[3rem] lg:bottom-20 left-calc z-50 flex flex-col items-center"
      style={{ left: 'calc(100vw - 90px)' }}
    >
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Telegram button */}
            <motion.a
              href="https://t.me/SKifHakasia"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0088cc] text-white shadow-lg hover:bg-[#0077b5]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              aria-label="Telegram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13"></path>
                <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
              </svg>
            </motion.a>

            {/* WhatsApp button */}
            <motion.a
              href="https://wa.me/79134403772"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#128C7E]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              aria-label="WhatsApp"
            >
              <MessageCircle size={24} />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Main toggle button с анимацией появления по скроллу */}
      <motion.button
        onClick={toggleOpen}
        className={`flex h-[3rem] w-[3rem] lg:h-[4rem] lg:w-[4rem] items-center justify-center rounded-full shadow-lg transition-all duration-300 text-white ${
          isOpen
            ? 'bg-skif-gold hover:bg-skif-darkGold'
            : 'bg-skif-gold hover:bg-skif-darkGold'
        } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
        aria-label={isOpen ? 'Close social menu' : 'Open social menu'}

      >
        {isOpen ? <X size={24} /> : <Phone size={24} />}
      </motion.button>
    </div>
  );
};

export default FloatingSocialButton;
