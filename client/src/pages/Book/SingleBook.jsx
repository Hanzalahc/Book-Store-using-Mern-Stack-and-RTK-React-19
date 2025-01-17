import React, { memo, useState, useEffect, useCallback } from "react";
import { Loader } from "../../components";
import { FiShoppingCart } from "react-icons/fi";
import useApiSubmit from "../../hooks/useApiSubmit";
import useProvideHooks from "../../hooks/useProvideHooks";
import useReduxHooks from "../../hooks/useReduxHooks";

const SingleBook = () => {
  const { apis, useParams } = useProvideHooks();
  const { cartActions, dispatch } = useReduxHooks();
  const { apiSubmit, loading } = useApiSubmit();
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    const fetchBookById = async () => {
      const data = await apiSubmit({
        url: `${apis().getBook.url}${id}`,
        method: apis().getBook.method,
        successMessage: null,
        showLoadingToast: false,
      });
      if (data.success) {
        setBook(data.data);
      }
    };

    fetchBookById();
    return () => {
      controller.abort();
    };
  }, []);

  const handleAddToCart = useCallback(
    (product) => {
      dispatch(cartActions.addToCart(product));
    },
    [dispatch, cartActions]
  );

  if (loading) return <Loader />;
  return (
    <div className="max-w-lg shadow-md p-5">
      <h1 className="text-2xl font-bold mb-6">{book?.title}</h1>

      <div className="">
        <div>
          <img src={book?.image?.url} alt={book?.title} className="mb-8" />
        </div>

        <div className="mb-5">
          <p className="text-gray-700 mb-2">
            <strong>Author:</strong> {book.author || "admin"}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Published:</strong>{" "}
            {new Date(book?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-4 capitalize">
            <strong>Category:</strong> {book?.category}
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong> {book?.description}
          </p>
        </div>

        <button
          onClick={() => handleAddToCart(book)}
          className="btn-primary px-6 space-x-1 flex items-center gap-1 "
        >
          <FiShoppingCart className="" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default memo(SingleBook);
