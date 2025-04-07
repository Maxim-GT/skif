
import React, { useRef, useEffect } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Список вопросов и ответов
  const faqItems: FAQItem[] = [
    {
      question: "Нужен ли мне опыт для занятий в стрелковом клубе?",
      answer: "Нет, опыт не требуется. Наши инструкторы проведут полный инструктаж и научат вас безопасному обращению с оружием. Мы работаем как с новичками, так и с опытными стрелками."
    },
    {
      question: "Какие документы нужны для посещения клуба?",
      answer: "Для посещения клуба необходим паспорт гражданина РФ. Дополнительных разрешений или лицензий не требуется, так как вы будете заниматься под наблюдением сертифицированных инструкторов."
    },
    {
      question: "Можно ли приходить со своим оружием?",
      answer: "Да, если у вас есть все необходимые разрешения и лицензии на ваше оружие. Перед посещением, пожалуйста, сообщите нам об этом заранее, чтобы мы могли подготовиться и проверить документы."
    },
    {
      question: "Проводите ли вы корпоративные мероприятия?",
      answer: "Да, мы организуем корпоративные мероприятия различного формата. Это может быть как командное соревнование, так и индивидуальное обучение для сотрудников вашей компании. Для уточнения деталей и бронирования даты, пожалуйста, свяжитесь с нами."
    },
    {
      question: "Какие меры безопасности соблюдаются в клубе?",
      answer: "Безопасность — наш главный приоритет. Все посетители проходят обязательный инструктаж перед началом занятий. На стрельбище всегда присутствуют инструкторы, следящие за соблюдением правил безопасности. Помещения оборудованы современными системами вентиляции и защиты. Всё оружие проходит регулярное техническое обслуживание."
    }
  ];

  useEffect(() => {
    const revealOnScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('active');
      }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();
    
    return () => {
      window.removeEventListener('scroll', revealOnScroll);
    };
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="section-spacing bg-white reveal">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-1 bg-skif-gold mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Часто задаваемые вопросы</h2>
          <p className="text-base lg:text-lg text-skif-charcoal/80 max-w-3xl text-center">
            Ответы на самые распространенные вопросы о нашем стрелковом клубе
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-12">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-skif-gold/30">
                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:text-skif-gold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-skif-charcoal/80 text-base pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center">
          <p className="text-skif-charcoal/80 mb-4">Остались вопросы?</p>
          <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-skif-gold hover:bg-skif-darkGold text-white px-6 py-3 rounded-md transition-colors">
            Связаться с нами
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;