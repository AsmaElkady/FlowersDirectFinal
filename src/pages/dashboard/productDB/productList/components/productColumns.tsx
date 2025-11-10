import type { TableColumn } from "react-data-table-component";
import type { IProduct } from "../../../../../types/productType";
import { Button } from "react-bootstrap";

export const productColumns = (
  handleDelete: (id: number) => void,
  handleEdit: (product: IProduct) => void
): TableColumn<IProduct>[] => [
  {
    name: "ID",
    selector: (row) => row.id ?? "-",
    sortable: true,
    width: "80px",
  },
  {
    name: "Image",
    cell: (row) => (
      <img
        src={row.image}
        alt={row.name}
        style={{
          width: 60,
          height: 60,
          borderRadius: "8px",
          objectFit: "cover",
        }}
      />
    ),
    width: "90px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Category",
    selector: (row) => row.category,
    sortable: true,
  },
  {
    name: "Price (EGP)",
    selector: (row) => `${row.price} EGP`,
    sortable: true,
  },
  {
    name: "Total Quantity",
    selector: (row) => row.totalQuantity.toString(),
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <div className="d-flex gap-2">
        <Button
          variant="outline-primary"
          size="sm"
          title="Edit"
          className="border-0"
          onClick={() => handleEdit(row)}
        >
          <i className="bi bi-pencil-square"></i>
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          title="Delete"
          onClick={() => handleDelete(row.id!)}
        >
          <i className="bi bi-trash3"></i>
        </Button>
      </div>
    ),
    width: "150px",
  },
];
