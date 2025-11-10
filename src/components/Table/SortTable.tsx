import DataTable from "react-data-table-component";
import type { DataTableProps } from "../../types/components/TableProps";

function DataTableComponent<T>({
  title,
  columns,
  data,
  selectableRows = false,
  onRowClicked,
  pagination = true,
  loading,
}: DataTableProps<T>) {
  return (
    <>
      <DataTable
        title={title}
        columns={columns}
        data={data}
        progressPending={loading}
        striped
        responsive
        selectableRows={selectableRows}
        onRowClicked={onRowClicked}
        pagination={pagination}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15]}
        highlightOnHover
        customStyles={customStyles}
      />
    </>
  );
}
export default DataTableComponent;

const customStyles = {
  headCells: {
    style: {
      fontWeight: "bold",
      fontSize: "15px",
      color: "#4e0629",
      backgroundColor: "#fbeff4",
    },
  },
};
