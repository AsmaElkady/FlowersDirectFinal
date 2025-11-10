import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useMemo } from "react";
import type { Order } from "../types/order";
import type { ICustomer } from "../types/auth";
import type { IProduct } from "../types/productType";

const useDashboard = () => {
  const { items: data } = useSelector((state: RootState) => state.products);
  const { category } = useSelector((state: RootState) => state.Category);
  const { users } = useSelector((state: RootState) => state.admin);
  const { orders } = useSelector((state: RootState) => state.orderSlice);
  const noOrders = orders?.length;

  const { catProd, prodStock, noProds } = useMemo(() => {
    const newData = new Map();
    data?.forEach((prod) => {
      const val = newData.get(prod.category);
      newData.set(prod.category, val + 1 || 1);
    });
    const catProd = category?.map((cat) => ({
      name: cat.name,
      uv: data?.filter((prod) => prod.category == cat.name).length,
    }));
    const prodStock = data?.map((prod) => ({
      name: prod.name,
      category: prod.category,
      stock: prod.totalQuantity,
    }));
    const noProds = data?.length;
    return { catProd, prodStock, noProds };
  }, [category, data]);

  const { noUsers, noCustomers, topCustomers } = useMemo(() => {
    const customersMap = new Map();
    const noUsers = users?.length - 1;
    const noCustomers = new Set(orders?.map((order) => order.userId)).size;
    orders?.map((order) => {
      const val = customersMap.get(order.userId);
      customersMap.set(order.userId, val + 1 || 1);
    });
    const customerArr = [...customersMap.entries()];
    const topCustomersIds = customerArr
      .sort((a, b) => a[1] - b[1])
      .splice(-5)
      .reverse();
    const topCustomers = [];
    for (const [customerId, orders] of topCustomersIds) {
      const cust = users.find((user: ICustomer) => user.id == customerId);
      if (cust) {
        topCustomers.push({
          ...cust,
          orders: orders,
        });
      }
    }
    return { noUsers, noCustomers, topCustomers };
  }, [orders, users]);

  const topProducts = useMemo(() => {
    const prodsMap = new Map();
    orders.map((order) =>
      order.items.map((item) => {
        const val = prodsMap.get(item.id);
        prodsMap.set(item.id, val + 1 || 1);
      })
    );

    const prodsArr = [...prodsMap.entries()];
    const topProdsIds = prodsArr
      .sort((a, b) => a[1] - b[1])
      .splice(-5)
      .reverse();
    const topProducts = [];

    for (const [prodId, sales] of topProdsIds) {
      const prod = data.find((product: IProduct) => product.id == prodId);
      if (prod) {
        topProducts.push({
          ...prod,
          sales: sales,
        });
      }
    }
    return topProducts;
  }, [data, orders]);

  const revenue = useMemo(() => {
    return orders?.reduce(
      (sum: number, order: Order) => sum + order.totalPrice,
      0
    );
  }, [orders]);

  return {
    ProductsByCategory: catProd,
    productsStock: prodStock,
    totalCategories: category,
    totalProducts: noProds,
    topProducts: topProducts,
    totalUsers: noUsers,
    totalCustomer: noCustomers,
    topCustomers: topCustomers,
    orders: noOrders,
    revenue: revenue,
  };
};
export default useDashboard;
