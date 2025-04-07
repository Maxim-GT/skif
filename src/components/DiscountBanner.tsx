import React from 'react';
import { Link } from 'react-scroll';

const DiscountBanner = () => {
  return (
    <section className="py-[10px] sm:py-[30px] bg-#bea04f reveal w-full overflow-x-hidden" style={{ backgroundColor: "#bea04f" }}>
      <Link 
        to="contact"
        spy={true}
        smooth={true}
        offset={-60}
        duration={800}
        className="block cursor-pointer transition-transform duration-300 hover:scale-105"
      >
        <img 
          src="./skif_ssk.png" 
          alt="Скидка за вступление в клуб" 
          className="w-full h-auto mobile-width-140"
        />
      </Link>
    </section>
  );
};

export default DiscountBanner;
