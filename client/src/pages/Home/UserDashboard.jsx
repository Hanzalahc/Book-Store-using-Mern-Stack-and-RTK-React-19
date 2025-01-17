import React, { memo, useEffect, useState } from "react";
import useReduxHooks from "../../hooks/useReduxHooks";
import useProvideHooks from "../../hooks/useProvideHooks";
import useApiSubmit from "../../hooks/useApiSubmit";
import { Loader } from "./../../components/";

const UserDashboard = () => {
  const { auth } = useReduxHooks();
  const { apis, navigate } = useProvideHooks();
  const { loading, apiSubmit } = useApiSubmit();

  const currentUser = auth?.currentUser;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      const response = await apiSubmit({
        url: apis().getUserOrders.url,
        method: apis().getUserOrders.method,
        query: { email: currentUser?.email },
        showLoadingToast: false,
      });
      if (response?.success) {
        setOrders(response.data);
      }
    };

    fetchOrders();
    return () => {
      controller.abort();
    };
  }, [currentUser]);

  if (loading) return <Loader />;

  return (
    <div className=" bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <p className="text-gray-700 mb-6">
          Welcome, {currentUser?.username || "User"}! Here are your recent
          orders:
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li
                  key={order._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-1"
                >
                  <p className="font-medium">Order ID: {order._id}</p>
                  <p>Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
                  <p>Total: ${order.totalPrice}</p>
                  {order?.productId.map((product) => (
                    <li key={product?._id}>
                      Title: {product?.title} Category: {product?.category}{" "}
                    </li>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You have no recent orders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(UserDashboard);
