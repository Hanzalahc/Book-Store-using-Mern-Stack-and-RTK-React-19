import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useReduxHooks from "./../../hooks/useReduxHooks";
import { toast } from "react-hot-toast";

function Register() {
  const { registerUser, signInWithGoogle, dispatch } = useReduxHooks();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formattedEmail = data.email.trim().replace(/\s+/g, "").toLowerCase();

    dispatch(registerUser({ email: formattedEmail, password: data.password }))
      .then((action) => {
        if (action.type === "registerUser/fulfilled") {
          navigate("/");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        // toast.error(error.message || "An error occurred. Please try again.");
        toast.success("Registration successful!");
        navigate("/");
      });
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle())
      .then((result) => {
        if (signInWithGoogle.fulfilled.match(result)) {
          toast.success("Google sign-in successful!");
          navigate("/");
        } else {
          toast.error("Google sign-in failed. Please try again.");
        }
      })
      .catch((error) => {
        toast.error(error.message || "An error occurred. Please try again.");
      });
  };
  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center ">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Register</h2>

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
              placeholder="Email Address"
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
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Password must contain at least one uppercase letter",
                  hasLowerCase: (value) =>
                    /[a-z]/.test(value) ||
                    "Password must contain at least one lowercase letter",
                  hasSpecialChar: (value) =>
                    /[\W_]/.test(value) ||
                    "Password must contain at least one special character",
                },
              })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.password.message}
            </p>
          )}
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-sm">
          Have an account? Please{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>

        {/* google sign in */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default memo(Register);
