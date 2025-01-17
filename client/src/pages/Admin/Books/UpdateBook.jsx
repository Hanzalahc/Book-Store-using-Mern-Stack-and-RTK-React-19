import React, { useEffect, memo, useState } from "react";
import { SelectField, FileUpload, Loader } from "../../../components";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useApiSubmit from "../../../hooks/useApiSubmit";
import useProvideHooks from "../../../hooks/useProvideHooks";

const UpdateBook = () => {
  const { apis, navigate } = useProvideHooks();
  const { apiSubmit, loading } = useApiSubmit();

  const { id } = useParams();
  const [bookData, setBookData] = useState({});
  const [files, setFiles] = useState([]);
  const [prevFile, setPrevFile] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // If no files are selected, use the previous file 
    let imageData;
    if (files.length === 0) {
      imageData = prevFile;
    } else {
      const { image } = files[0];
      imageData = {
        url: image.url,
        publicId: image.publicId,
      };
    }

    const formattedTitle = data.title.replace(/\s+/g, " ").trim();
    const formattedDescription = data.description.replace(/\s+/g, " ").trim();
    const updatedBookData = {
      ...data,
      title: formattedTitle,
      description: formattedDescription,
      image: imageData,
    };

    const responce = await apiSubmit({
      url: `${apis().updateBook.url}${id}`,
      method: apis().updateBook.method,
      values: updatedBookData,
      showLoadingToast: true,
      loadingMessage: "Updating Book...",
    });

    if (responce.success) {
      reset();
      setFiles([]);
      navigate("/admin/manage-books");
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchBook = async () => {
      const fetchBookResponce = await apiSubmit({
        url: `${apis().getBook.url}${id}`,
        method: apis().getBook.method,
        successMessage: null,
        showLoadingToast: false,
      });

      if (fetchBookResponce.success) {
        const book = fetchBookResponce.data;
        setBookData(book);

        setValue("title", book.title);
        setValue("description", book.description);
        setValue("category", book.category);
        setValue("trending", book.trending);
        setValue("oldPrice", book.oldPrice);
        setValue("newPrice", book.newPrice);

        setPrevFile({
          url: book.image.url,
          publicId: book.image.publicId,
        });
      }
    };

    fetchBook();
    return () => {
      controller.abort();
    };
  }, [id, setValue]);

  if (loading) return <Loader />;
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
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
            defaultValue={bookData.title}
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
            defaultValue={bookData.description}
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

        <SelectField
          label="Category"
          name="category"
          defaultValue={bookData.category}
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
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              defaultValue={bookData.trending}
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold text-gray-700"
            htmlFor="oldPrice"
          >
            Old Price
          </label>
          <input
            id="oldPrice"
            defaultValue={bookData.oldPrice}
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
            defaultValue={bookData.newPrice}
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

        <div className="mb-4">
          <span className="block text-sm font-semibold text-gray-700 mb-2">
            If you want to update the image, please upload a new image.
            Otherwise leave it as it is.
          </span>

          <FileUpload files={files} setFiles={setFiles} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          {loading ? "Updating Book..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default memo(UpdateBook);
