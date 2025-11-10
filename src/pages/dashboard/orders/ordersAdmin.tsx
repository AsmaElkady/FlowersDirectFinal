import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { Button } from "react-bootstrap";
import type { Order } from "../../../types/order";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router";
import DataTableComponent from "../../../components/Table/SortTable";
import Search from "../../../components/Inputs/Search";
import {
  deleteOrder,
  updateOrderStatus,
} from "../../../redux/slices/order.slice";

const OrdersAdmin = () => {
  const [rows, setRows] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { orders, loading } = useSelector(
    (state: RootState) => state.orderSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const allOrders = useMemo(() => {
    return orders;
  }, [orders]);

  useEffect(() => {
    if (search === "") {
      setRows(allOrders);
    } else {
      setRows(
        allOrders.filter(
          (order: Order) =>
            String(order.id).toLowerCase().includes(search.toLowerCase()) ||
            String(order.userId).toLowerCase().includes(search.toLowerCase()) ||
            String(order.status).toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [orders, search, allOrders]);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const statusClassMap: Record<string, string> = {
    delivered: "bg-success",
    shipped: "bg-info",
    processing: "bg-warning text-dark",
    cancelled: "bg-danger",
    pending: "bg-secondary",
  };

  const toTitle = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const columns = [
    {
      name: "Order",
      selector: (row: Order) => row.id ?? 0,
      sortable: true,
      cell: (row: Order) => (
        <Link
          to={`/dashboard/orders/${row.id ?? ""}`}
          className="text-decoration-none fw-semibold"
          title="View Order"
        >
          #{row.id}
        </Link>
      ),
    },
    {
      name: "User ID",
      selector: (row: Order) => row.userId,
      sortable: true,
      cell: (row: Order) => <span className="text-muted">#{row.userId}</span>,
    },
    {
      name: "Items",
      selector: (row: Order) => row.items?.length ?? 0,
      sortable: true,
      cell: (row: Order) => (
        <span className="badge bg-light text-dark">
          {row.items?.length ?? 0}
        </span>
      ),
      right: true,
    },
    {
      name: "Total",
      selector: (row: Order) => row.totalPrice ?? 0,
      sortable: true,
      cell: (row: Order) => (
        <span className="fw-semibold">
          {currencyFormatter.format(row.totalPrice ?? 0)}
        </span>
      ),
      right: true,
    },
    {
      name: "Status",
      selector: (row: Order) => row.status,
      sortable: true,
      cell: (row: Order) => (
        <span
          className={`badge rounded-pill ${
            statusClassMap[row.status] ?? "bg-secondary"
          }`}
        >
          {toTitle(row.status)}
        </span>
      ),
    },
    {
      name: "Action",
      cell: (row: Order) => (
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="link"
            className="text-primary p-0"
            onClick={() => handleStatusChange(row)}
            title="Change Status"
            aria-label="Change Status"
          >
            <i className="bi bi-arrow-repeat"></i>
          </Button>
          <Button
            variant="link"
            className="p-0"
            onClick={() => handleView(row)}
            title="View Details"
            aria-label="View Details"
          >
            <i className="bi bi-eye"></i>
          </Button>
          <Button
            variant="link"
            className="text-danger p-0"
            onClick={() => handleDelete(row)}
            title="Delete Order"
            aria-label="Delete Order"
          >
            <i className="bi bi-trash3"></i>
          </Button>
        </div>
      ),
      width: "160px",
    },
  ];

  const handleDelete = (row: Order) => {
    Swal.fire({
      html: `Are you sure you want to remove order <br /> Order ID: ${
        row.id
      } <br/> Total: $${row.totalPrice.toFixed(2)}`,
      icon: "error",
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText: "Remove",
      showCancelButton: true,
      customClass: {
        title: "swal-title",
        htmlContainer: "swal-text",
      },
    }).then((result) => {
      if (result.isDenied && row.id) {
        dispatch(deleteOrder(row.id)).then((res) => {
          if (res.type === "order/deleteOrder/fulfilled") {
            toast.success("Order deleted successfully");
          } else {
            toast.error("Can't delete this order");
          }
        });
      }
    });
  };

  const handleView = (row: Order) => {
    navigate(`/dashboard/orders/${row.id}`);
  };

  const handleStatusChange = (row: Order) => {
    const statusOptions = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    Swal.fire({
      title: "Change Order Status",
      html: `
        <p>Current Status: <strong>${row.status}</strong></p>
        <select id="status-select" class="form-select">
          ${statusOptions
            .map(
              (status) =>
                `<option value="${status}" ${
                  status === row.status ? "selected" : ""
                }>${status.charAt(0).toUpperCase() + status.slice(1)}</option>`
            )
            .join("")}
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const select = document.getElementById(
          "status-select"
        ) as HTMLSelectElement;
        return select.value;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value && row.id) {
        dispatch(
          updateOrderStatus({ orderId: row.id, status: result.value })
        ).then((res) => {
          if (res.type === "order/updateOrderStatus/fulfilled") {
            toast.success("Order status updated successfully");
          } else {
            toast.error("Failed to update order status");
          }
        });
      }
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-primary">Orders</h3>
        <div className="d-flex">
          <div>
            <Search
              handleSearch={(e) => {
                setSearch(e.target.value);
              }}
              show={showInput}
            />
          </div>
          <Button
            className="bg-light text-primary m-2"
            onClick={() => setShowInput(!showInput)}
          >
            <SearchIcon />
          </Button>
        </div>
      </div>

      <DataTableComponent columns={columns} data={rows} loading={loading} />
      <ToastContainer />
    </div>
  );
};

export default OrdersAdmin;
