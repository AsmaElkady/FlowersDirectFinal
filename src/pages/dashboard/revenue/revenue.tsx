import Smooth from "../../../components/animations/smooth";
import useDashboard from "../../../hooks/useDashboard";
import "./revenue.css";
import CountUp from "react-countup";

export default function Revenue() {
  const {
    totalProducts,
    orders,
    revenue,
    totalCustomer,
    topProducts,
    topCustomers,
  } = useDashboard();

  return (
    <>
      <div className="row g-3">
        <div className="col-md-6">
          <Smooth className="card bg-card p-3 text-dark rounded-4 text-primary bg-light">
            <div className="d-flex align-items-center justify-content-between  mb-2 ">
              <div>
                <i className="fa-solid fa-sack-dollar fs-4" /> Total Revenue
              </div>
              <CountUp end={revenue} style={{ fontSize: 30 }} duration={5} />
            </div>
          </Smooth>
          <Smooth className="card bg-card p-3 text-dark rounded-4 text-primary mt-2 bg-light">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div>
                <i className="fa-solid fa-seedling fs-4"></i> Products
              </div>
              <CountUp
                end={totalProducts}
                style={{ fontSize: 30 }}
                duration={5}
              />
            </div>
          </Smooth>
        </div>
        <div className="col-md-6">
          <Smooth className="card bg-card p-3 text-dark rounded-4 text-primary bg-light h-100 w-100">
            <h4>
              <i className="fa-solid fa-award mb-1"></i> Top Products
            </h4>
            <div className="w-100">
              {topProducts.map((prod) => {
                return (
                  <div className="d-flex justify-content-between mt-1">
                    <div className="d-flex align-items-center justify-content-center">
                      <img
                        src={prod.image}
                        width={30}
                        height={30}
                        alt={prod.name}
                        className="rounded-circle"
                      />
                      <p className="ms-2 p-0 m-0">{prod.name}</p>
                    </div>
                    <CountUp
                      end={prod.sales}
                      style={{ fontSize: 20 }}
                      duration={5}
                    />
                  </div>
                );
              })}
            </div>
          </Smooth>
        </div>
        <div className="col-md-6">
          <Smooth className="card bg-card p-3 text-dark rounded-4 text-primary bg-light h-100 w-100">
            <h4>
              <i className="fa-solid fa-trophy"></i> Top Customers
            </h4>
            <div className="w-100">
              {topCustomers.map((user) => {
                return (
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="ms-2 p-0 m-0">{user.username}</p>
                    </div>
                    <CountUp
                      end={user.orders}
                      style={{ fontSize: 20 }}
                      duration={5}
                    />
                  </div>
                );
              })}
            </div>
          </Smooth>
        </div>
        <div className="col-md-6">
          <Smooth className="card bg-card p-3 text-dark rounded-4 text-primary bg-light">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div>
                <i className="fa-brands fa-first-order-alt fs-4"></i> Orders
              </div>
              <CountUp end={orders} style={{ fontSize: 30 }} duration={5} />
            </div>
          </Smooth>
          <Smooth className="card bg-card p-3 text-dark rounded-4 text-primary bg-light mt-2">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div>
                <i className="fa-solid fa-user"></i> Customers
              </div>
              <CountUp
                end={totalCustomer}
                style={{ fontSize: 30 }}
                duration={5}
              />
            </div>
          </Smooth>
        </div>
      </div>
    </>
  );
}
