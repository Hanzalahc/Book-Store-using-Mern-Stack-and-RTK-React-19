import React, { useState, memo, useEffect, useMemo } from "react";
import { BookCard } from "../";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useApiSubmit from "../../hooks/useApiSubmit";
import useProvideHooks from "../../hooks/useProvideHooks";

const categories = [
  "Choose a genre",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
  "Books",
  "Marketing",
];

const TopSellers = () => {
  const { apis } = useProvideHooks();
  const { apiSubmit, loading } = useApiSubmit();
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const [books, setBooks] = useState([]);

  const filteredBooks = useMemo(() => {
    return selectedCategory === "Choose a genre"
      ? books
      : books.filter((book) => book.category === selectedCategory);
  }, [books, selectedCategory]);

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
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
      {/* category filtering */}
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {filteredBooks.length > 0 &&
          filteredBooks.map((book, index) => (
            <SwiperSlide key={book._id}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default memo(TopSellers);
