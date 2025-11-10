import type { ReactNode } from "react";

export interface IModalProps {
  title: string;
  show: boolean;
  handleClose?: () => void;
  handleSave?: () => void;
  body: ReactNode;
  showActions: boolean;
}
