import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { Button } from "react-bootstrap";
import type { ICustomer, IUser } from "../../../types/auth";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminEmail } from "../../../constants/main";
import { Admin } from "../../../classes/users";
import SearchIcon from "@mui/icons-material/Search";
import ModalComponent from "../../../components/Modal/Modal";
import ChangePassword from "./changePassword";
import DataTableComponent from "../../../components/Table/SortTable";
import Search from "../../../components/Inputs/Search";
import Loading from "../../../components/Loading/Loading";

const UsersDB = () => {
  const [rows, setRows] = useState<ICustomer[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [id, setID] = useState<number | undefined>();
  const { users, status, isLoading, isError, error } = useSelector(
    (state: RootState) => state.admin
  );
  const { orders } = useSelector((state: RootState) => state.orderSlice);
  const dispatch = useDispatch<AppDispatch>();

  const customersUsers = useMemo(() => {
    return (
      users
        .filter((user: ICustomer | IUser) => user.email != adminEmail)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ password, cart, ...reset }: ICustomer) => reset)
    );
  }, [users]);

  useEffect(() => {
    if (search == "") {
      setRows(customersUsers);
    } else {
      setRows(
        rows.filter(
          (row) =>
            String(row.id).includes(search) ||
            String(row.email).toLowerCase().includes(search) ||
            String(row.username).toLowerCase().includes(search)
        )
      );
    }
  }, [users, search, customersUsers, rows]);

  const columns = [
    {
      name: "ID",
      selector: (row: ICustomer) => row.id ?? 0,
      sortable: true,
    },
    {
      name: "User name",
      selector: (row: ICustomer) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: ICustomer) => row.email,
      sortable: true,
    },
    {
      name: "No. Orders",
      selector: (row: ICustomer) =>
        orders.filter((order) => order.userId == row.id).length,
      //useMemo(() => {return orders.filter((order) => order.userId == row.id).length}, [row]),
      //row.orders?.length ?? 0,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: ICustomer) => (
        <div className="d-flex">
          <Button
            className="text-primary bg-transparent border-0 m-0 p-0"
            onClick={() => handleEdit(row)}
          >
            <i className="bi bi-pencil-square"></i>
          </Button>
          <Button
            className="text-danger bg-transparent border-0"
            onClick={() => handleDelete(row)}
          >
            <i className="bi bi-trash3"></i>
          </Button>
        </div>
      ),
      width: "150px",
    },
  ];

  const handleDelete = (row: Partial<ICustomer>) => {
    Swal.fire({
      //title: `Are your sure that you want to remove this customer?`,
      html: ` Are your sure that you want to remove customer <br />  Name: ${row.username} <br/> ID: ${row.id} `,
      icon: "error",
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText: "remove",
      showCancelButton: true,
      customClass: {
        title: "swal-title",
        htmlContainer: "swal-text",
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied && row.id) {
        dispatch(Admin.deleteUser(row.id)).then((res) => {
          if (res.type == "users/remove/fulfilled") {
            dispatch(Admin.viewUsers());
            toast("User deleted successfuly");
          } else {
            toast.error("Cann't delete this user");
          }
        });
      }
    });
  };

  const handleEdit = (row: ICustomer) => {
    setShowModal(true);
    setID(row.id);
  };

  if (status === "loading") return <Loading />;
  if (isError) return <p>Error: {error}</p>;

  const handleConfirmReset = ({
    status,
    msg,
  }: {
    status: boolean;
    msg: string;
  }) => {
    if (status) {
      setShowModal(!showModal);
      toast("Password changeg correctly");
    } else {
      setShowModal(!showModal);
      toast.error(msg);
    }
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-primary">Users</h3>
        <div className="d-flex align-items-center">
          <div>
            <Search
              handleSearch={(e) => {
                setSearch(e.target.value);
              }}
              show={showInput}
            />
          </div>
          <Button
            className="bg-light text-primary mx-2"
            onClick={() => setShowInput(!showInput)}
          >
            <SearchIcon />
          </Button>
        </div>
      </div>

      <ModalComponent
        show={showModal}
        title={"Edit Password"}
        body={
          <>
            <ChangePassword
              id={id}
              checkResetStatus={({
                status,
                msg,
              }: {
                status: boolean;
                msg: string;
              }) => handleConfirmReset({ status, msg })}
            />
          </>
        }
        showActions={false}
        handleClose={() => setShowModal(false)}
      />
      <DataTableComponent columns={columns} data={rows} loading={isLoading} />
      <ToastContainer />
    </div>
  );
};

export default UsersDB;
