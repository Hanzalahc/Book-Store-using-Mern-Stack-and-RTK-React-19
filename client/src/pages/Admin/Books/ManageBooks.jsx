import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApiSubmit from "../../../hooks/useApiSubmit";
import useProvideHooks from "../../../hooks/useProvideHooks";

const ManageBooks = () => {
  const { apis } = useProvideHooks();
  const { apiSubmit, loading } = useApiSubmit();

  const [books, setBooks] = useState([]);

  const handleDeleteBook = async (id, title) => {
    const responce = await apiSubmit({
      url: `${apis().deleteBook.url}${id}`,
      method: apis().deleteBook.method,
      values: { title },
      showLoadingToast: true,
      loadingMessage: "Deleting book...",
    });

    if (responce.success) {
      setBooks(books.filter((book) => book._id !== id));
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchBooks = async () => {
      const fetchBooksResponce = await apiSubmit({
        url: apis().getAllBooks.url,
        method: apis().getAllBooks.method,
        successMessage: null,
        showLoadingToast: false,
      });

      if (fetchBooksResponce.success) {
        setBooks(fetchBooksResponce.data);
      }
    };

    fetchBooks();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  All Books
                </h3>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    #
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Book Title
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Category
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Price
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {books &&
                  books.map((book, index) => (
                    <tr key={book._id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {index + 1}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {book.title}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {book.category}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        ${book.newPrice}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">
                        <Link
                          to={`/admin/edit-book/${book._id}`}
                          className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline underline-offset-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteBook(book._id, book.title)}
                          className="font-medium bg-red-500 py-1 px-4 rounded-full text-white mr-2"
                        >
                          {loading ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ManageBooks);
