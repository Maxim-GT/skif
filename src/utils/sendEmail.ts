import { toast } from 'sonner';

export interface EmailFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export const sendEmail = async (formData: EmailFormData): Promise<boolean> => {
  try {
    // URL сервера Express, на котором запущен backend (например, http://localhost:3000)
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Ошибка API:', errorData);
      throw new Error(errorData.error || 'Ошибка при отправке формы');
    }

    return true;
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
    toast.error(`Ошибка отправки: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    return false;
  }
};