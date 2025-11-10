import type { ReactNode } from "react";
import type { TableColumn } from "react-data-table-component";

export interface CustomerData {
  id: number;
  username: string;
  email: string;
  orders: [];
}

export interface CustomerHrader {
  id: number;
  username: string;
  email: string;
  password: string;
  orders: [];
  action?: ReactNode;
}

export interface DataTableProps<T> {
  title?: string;
  columns: TableColumn<T>[];
  data: T[];
  selectableRows?: boolean;
  onRowClicked?: (row: T) => void;
  pagination?: boolean;
  loading: boolean;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
