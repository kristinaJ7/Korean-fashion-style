export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface FormBlockUIProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;

  errors?: Record<keyof FormData, string | null>;
}
