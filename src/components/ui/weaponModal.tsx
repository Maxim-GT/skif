import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Weapon {
  id: number;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
}

interface WeaponModalProps {
  weapon: Weapon | null;
  open: boolean;
  onClose: () => void;
  onAction?: () => void;
}

const WeaponModal: React.FC<WeaponModalProps> = ({ weapon, open, onClose, onAction }) => {
  if (!weapon) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:w-auto w-[90%] max-w-[400px] sm:max-w-lg sm:px-6 px-4 py-5 sm:py-6 rounded-lg"> {/* Улучшенные отступы */}
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-skif-black mb-2">
            {weapon.name}
          </DialogTitle>
          <DialogDescription className="text-skif-charcoal">
            <div className="mb-4 overflow-hidden rounded-md">
              <img 
                src={weapon.image} 
                alt={weapon.name} 
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="my-4 text-base text-skif-charcoal">
              {weapon.fullDescription}
            </p>
            <Button 
              onClick={onAction} 
              className="w-full bg-skif-gold hover:bg-skif-darkGold text-white font-medium transition-colors mt-4"
            >
              Буду стрелять
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default WeaponModal;
