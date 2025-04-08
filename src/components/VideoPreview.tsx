import React from 'react';

const VideoPreview: React.FC = () => {
  return (
    <section 
      id="video-preview" 
      className="gradient-bg-2 relative reveal"
    >
      <div className="absolute inset-0 mongolian-pattern-border opacity-10"></div>
      <div className="container mx-auto pt-16 lg:pt-20 pb-16">
        <div className="flex flex-col items-center mb-16">
          <div className="w-20 h-1 bg-skif-gold mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">
            Виртуальная экскурсия по тиру
          </h2>
        </div>
        
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl mx-auto max-w-4xl">
          <iframe
            className="w-full h-full object-cover"
            // src="https://rutube.ru/play/embed/c4ec418289a825546f477bc21e51bade?wmode=transparent"
            allowFullScreen
            title="RuTube Video Player"
          ></iframe>
          {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <p className="text-white text-lg font-semibold">
              Познакомьтесь с нашим современным стрелковым комплексом
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default VideoPreview;
