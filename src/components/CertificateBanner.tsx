import React from 'react';
import { Link } from 'react-scroll';

const CertificateBanner = () => {
  return (
    <section className="py-[10px] sm:py-[30px] w-full overflow-x-hidden reveal" style={{ backgroundColor: "#bea04f" }}>
      <Link 
        to="contact"
        spy={true}
        smooth={true}
        offset={-60}
        duration={800}
        className="block cursor-pointer transition-transform duration-300 hover:scale-105"
      >
        <img 
          src="./skif_sert.png" 
          alt="Подарочные сертификаты с доставкой" 
          className="w-full mobile-width-160"
        />
      </Link>
    </section>
  );
};

export default CertificateBanner;
