// src/pages/Index.tsx
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import CertificateBanner from '@/components/CertificateBanner';
import WeaponsSection from '@/components/WeaponSection';
import GallerySection from '@/components/GallerySection';
import FAQSection from '@/components/Faq';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  // Scroll animation handler
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');

      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Сбрасываем стиль курсора для всех секций, кроме hero
  useEffect(() => {
    document.body.style.cursor = 'auto';
    const sections = document.querySelectorAll('section:not(#hero-section)');
    sections.forEach(section => section.classList.add('cursor-auto'));

    const heroButtons = document.querySelectorAll('#hero-section button, #hero-section a');
    heroButtons.forEach(button => button.classList.add('cursor-pointer'));
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CertificateBanner />
      <WeaponsSection />
      <GallerySection />
      <FAQSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
