import React, { memo, useEffect, useState } from "react";
import useReduxHooks from "../../hooks/useReduxHooks";
import useProvideHooks from "../../hooks/useProvideHooks";
import useApiSubmit from "../../hooks/useApiSubmit";
import { Loader } from "../../components";

const OrderPage = () => {
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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders?.length === 0 ? (
        <div>No orders found!</div>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={order?._id} className="border-b mb-4 pb-4">
              <p className="p-1 bg-secondary text-white w-10 rounded mb-1">
                # {index + 1}
              </p>
              <h2 className="font-bold">Order ID: {order?._id}</h2>
              <p className="text-gray-600">Name: {order?.name}</p>
              <p className="text-gray-600">Email: {order?.email}</p>
              <p className="text-gray-600">Phone: {order?.phone}</p>
              <p className="text-gray-600">Total Price: ${order?.totalPrice}</p>
              <h3 className="font-semibold mt-2">Address:</h3>
              <p>
                {" "}
                {order?.address?.city}, {order?.address?.state},{" "}
                {order?.address?.country}, {order?.address?.zipcode}
              </p>
              <h3 className="font-semibold mt-2">Product Details:</h3>
              <ul>
                {order?.productId.map((product) => (
                  <li key={product?._id}>
                    Title: {product?.title} Category: {product?.category}{" "}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(OrderPage);
