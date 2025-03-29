import React, { useCallback, useState } from 'react';
import ReactModal from 'react-modal';
import { X } from 'lucide-react';

const Modal = ({ selectedImage, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 400);
  };

  const handleAfterOpen = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const handleAfterClose = useCallback(() => {
    document.body.style.overflow = '';
  }, []);

  return (
    <ReactModal
      isOpen={!!selectedImage}
      onRequestClose={handleClose}
      onAfterOpen={handleAfterOpen}
      onAfterClose={handleAfterClose}
      closeTimeoutMS={400}
      className="fixed inset-0 z-50 flex items-center justify-center outline-none px-4 md:px-8"
      overlayClassName={`fixed inset-0 bg-black/90 transition-opacity duration-400 ease-out ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      shouldCloseOnOverlayClick={true}
    >
      {/* Клик по фону закрывает модалку */}
      <div className="absolute inset-0" onClick={handleClose}></div>

      {/* Контейнер с картинкой и кнопкой закрытия */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-400 ease-out ${
          isClosing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Кнопка закрытия */}
        <button
          className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/80 transition z-20"
          onClick={handleClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Картинка */}
        <img
          src={selectedImage}
          alt="Enlarged gallery"
          className="max-h-[80vh] w-auto max-w-full object-contain transition-opacity duration-400 ease-out"
          onClick={(e) => e.stopPropagation()} 
        />
      </div>
    </ReactModal>
  );
};

export default Modal;
