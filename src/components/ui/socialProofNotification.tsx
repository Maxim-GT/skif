import React, { useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { BellRing } from "lucide-react";

// List of random Russian names
const names = [
  "Виктор", "Александр", "Дмитрий", 
  "Сергей", "Наталья", "Андрей", "Мария",
  "Иван", "Михаил", "Елена", "Артем",
  "Алексей", "Светлана", "Павел",
];

const actions = [
  "заполняет заявку",
  "отправил(-а) заявку",
  "выбирет оружие"
];

const SocialProofNotification = () => {
  useEffect(() => {
    // Function to show random social proof notification
    const showRandomNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      toast({
        title: "Активность на сайте",
        description: (
            <div className="flex items-center gap-2">
            <BellRing className="h-4 w-4 text-skif-gold" />
            <span> {randomName} {randomAction}</span>
            </div>
        ),
        duration: 5000, // Show for 5 seconds
        variant: "social"
      });
    };
    
    // Initial delay before showing first notification (between 30-60 seconds after page load)
    const initialDelay = Math.floor(Math.random() * (60000 - 30000) + 30000);
    
    const initialTimer = setTimeout(() => {
      showRandomNotification();
      
      // Set up interval for subsequent notifications (every 3-5 minutes)
      const intervalTime = Math.floor(Math.random() * (300000 - 180000) + 180000);
      const intervalTimer = setInterval(showRandomNotification, intervalTime);
      
      return () => clearInterval(intervalTimer);
    }, initialDelay);
    
    return () => clearTimeout(initialTimer);
  }, []);
  
  return null; // This component doesn't render anything visible
};

export default SocialProofNotification;