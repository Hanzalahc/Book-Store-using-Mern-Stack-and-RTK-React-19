import React, { useState, memo } from "react";
import { SelectField, FileUpload } from "../../../components";
import { useForm } from "react-hook-form";
import useProvideHooks from "../../../hooks/useProvideHooks";
import useApiSubmit from "../../../hooks/useApiSubmit";

const AddBook = () => {
  const { apis } = useProvideHooks();
  const { apiSubmit, loading } = useApiSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [files, setFiles] = useState([]);

  const onSubmit = async (data) => {
    const { image } = files[0];
    const formattedTitle = data.title.replace(/\s+/g, " ").trim();
    const formattedDescription = data.description.replace(/\s+/g, " ").trim();
    const newBookData = {
      ...data,
      title: formattedTitle,
      description: formattedDescription,
      image,
    };

    const responce = await apiSubmit({
      url: apis().addBook.url,
      method: apis().addBook.method,
      values: newBookData,
      showLoadingToast: true,
      loadingMessage: "Creating Book...",
    });

    if (responce.success) {
      reset();
      setFiles([]);
    }
  };

  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      <div className="mb-4"></div>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Reusable Input Field for Title */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter book title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title should be at least 3 characters",
              },
              maxLength: {
                value: 80,
                message: "Title should not exceed 80 characters",
              },
            })}
            className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Reusable Textarea for Description */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter book description"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description should be at least 10 characters",
              },
            })}
            className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "Business", label: "Business" },
            { value: "Technology", label: "Technology" },
            { value: "Fiction", label: "Fiction" },
            { value: "Horror", label: "Horror" },
            { value: "Adventure", label: "Adventure" },
            { value: "Marketing", label: "Marketing" },
            { value: "Books", label: "Books" },
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        {/* Old Price */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold text-gray-700"
            htmlFor="oldPrice"
          >
            Old Price
          </label>
          <input
            id="oldPrice"
            name="oldPrice"
            type="number"
            step="0.01"
            placeholder="Old Price"
            {...register("oldPrice", {
              required: "Old Price is required",
              min: {
                value: 0,
                message: "Price should be greater than 0",
              },
            })}
            className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.oldPrice && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.oldPrice.message}
            </p>
          )}
        </div>

        {/* New Price */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold text-gray-700"
            htmlFor="newPrice"
          >
            New Price
          </label>
          <input
            id="newPrice"
            name="newPrice"
            type="number"
            step="0.01"
            placeholder="New Price"
            {...register("newPrice", {
              required: "New Price is required",
              min: {
                value: 0,
                message: "Price should be greater than 0",
              },
            })}
            className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.newPrice && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.newPrice.message}
            </p>
          )}
        </div>

        {/* Cover Image Upload */}
        <div className="mb-4">
          <FileUpload files={files} setFiles={setFiles} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {loading ? "Creating Book..." : "Create Book"}
        </button>
      </form>
    </div>
  );
};

export default memo(AddBook);
