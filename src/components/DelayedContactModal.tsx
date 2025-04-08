import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { sendEmail, EmailFormData } from "@/utils/sendEmail";
import { toast } from "sonner";

// Константа для хранения ключа в sessionStorage
const MODAL_SHOWN_KEY = 'contact-modal-shown';

// Схема валидации формы
const formSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(6, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email").optional().or(z.literal('')),
  message: z.string().optional(),
});

const DelayedContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Инициализация формы
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    // Проверяем, было ли уже показано модальное окно в текущей сессии
    const hasModalBeenShown = sessionStorage.getItem(MODAL_SHOWN_KEY) === 'true';
    
    if (!hasModalBeenShown) {
      // Если модальное окно еще не показывалось, устанавливаем таймер на 3 минуты
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Помечаем в sessionStorage, что модальное окно было показано
        sessionStorage.setItem(MODAL_SHOWN_KEY, 'true');
      }, 5 * 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Подготавливаем данные формы и добавляем метку "[Скидка]"
      const emailData: EmailFormData = {
        name: values.name,
        phone: values.phone,
        email: values.email || '',
        message: `[Скидка] ${values.message || ''}`,
      };
      
      // Отправляем форму
      const success = await sendEmail(emailData);
      
      if (success) {
        toast.success("Спасибо! Ваше сообщение отправлено");
        setIsOpen(false);
        form.reset();
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      toast.error("Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="ml-auto mr-auto w-[90%] lg:w-[35rem] h-auto rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Для вас скидка</DialogTitle>
          <DialogDescription>
            Оставьте свои контактные данные – получите скидку на стрельбу!
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите ваше имя" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <Input placeholder="+7 (___) ___-__-__" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@mail.ru" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сообщение</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Ваше сообщение или вопрос..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="submit" 
                className="text-base w-full bg-skif-gold hover:bg-skif-darkGold text-white" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Жду звонка"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DelayedContactModal;
