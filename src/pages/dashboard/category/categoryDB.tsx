
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import Button from "react-bootstrap/Button";
import { type ICategory } from "../../../redux/slices/category";
import HandelAdd from "./addCategory";
import { useState } from "react";
import DeleteCategory from "./deleteCategoryDB";
import EditCategoryDB from "./editCategory";
import SearchIcon from "@mui/icons-material/Search";

export default function CategoryDBk() {
  const { category, loading } = useSelector(
    (state: RootState) => state.Category
  );

  const [showModal, setShowModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = category.filter((cat: ICategory) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: "ID",
      selector: (row: ICategory) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Image",
      cell: (row: ICategory) => (
        <img
          src={row.image}
          alt={row.name}
          width={60}
          height={60}
          style={{ borderRadius: "8px", objectFit: "cover" }}
        />
      ),
      width: "80px",
    },
    {
      name: "Name",
      selector: (row: ICategory) => row.name,
      width: "150px",
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: ICategory) => row.desc,
      wrap: true,
    },

    {
      name: "Action",
      cell: (row: ICategory) => (
        <div className="d-flex gap-2">
          <EditCategoryDB
            id={row.id}
            name={row.name}
            desc={row.desc}
            img={row.image}
          />
          <DeleteCategory id={row.id} name ={row.name} />
        </div>
      ),
      width: "150px",
    },
  ];

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-primary">Categories</h3>
        <div className="position-relative">
          <input
            type="text"
            className="p-1 position-absolute "
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              display: showInput ? "block" : "none",
              right: 190,
              bottom: 10,
              zIndex: 3,
            }}
          />
          <Button
            className="bg-light text-primary m-2"
            onClick={() => setShowInput(!showInput)}
          >
            <SearchIcon />
          </Button>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Category
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredCategories}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        responsive
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15]}
        customStyles={{
          headCells: {
            style: {
              fontWeight: "bold",
              fontSize: "15px",
              color: "#4e0629",
              backgroundColor: "#fbeff4",
            },
          },
        }}
      />

      <HandelAdd showM={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
