import React, { memo } from "react";
import { useForm } from "react-hook-form";
import useReduxHooks from "../../hooks/useReduxHooks";
import useProvideHooks from "../../hooks/useProvideHooks";
import useApiSubmit from "../../hooks/useApiSubmit";
import axios from "axios";

const AdminLogin = () => {
  const { dispatch, adminActions } = useReduxHooks();
  const { apis, navigate } = useProvideHooks();
  const { apiSubmit, loading } = useApiSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formatedEmail = data.email.trim().toLowerCase().replace(/\s+/g, "");
    console.log(apis().adminLogin.url);
    console.log(apis().adminLogin.method);
    console.log({ ...data, email: formatedEmail });

    const response = await apiSubmit({
      url: apis().adminLogin.url,
      method: apis().adminLogin.method,
      values: { ...data, email: formatedEmail },
      showLoadingToast: true,
      loadingMessage: "Logging in...",
    });

    if (response?.success) {
      dispatch(
        adminActions.setAdminLogin({
          role: response.data.role,
          email: response.data.email,
        })
      );
      navigate("/admin");
    }
  };
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard Login </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              name="email"
              id="email"
              placeholder="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {
            <p className="text-red-500 text-xs italic mt-1">
              {errors.password && errors.password.message}
            </p>
          }
          <div className="w-full">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default memo(AdminLogin);
