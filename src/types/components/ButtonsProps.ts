import React from "react";

export interface IButtonProps {
  varient: "primary" | "secondary";
  title: string;
  type?: "submit" | "reset" | "button";
  isLoading: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface IAuthProps {
  name: string;
  title: string;
  navTo: string;
  navName: string;
  isLoading: boolean;
}
