export interface InputProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  className?: string;
  error?: string;
  value?: string;
}

export interface PasswordProps {
  id?: "password" | "re_password";
  label?: "Password" | "Repassword";
  forgetPass?: boolean;
  className?: string;
}

export interface ISearchProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show?: boolean;
}
