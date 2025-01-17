import React, { useEffect, useState, memo } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BookCard, Loader } from "../";
import useApiSubmit from "../../hooks/useApiSubmit";
import useProvideHooks from "../../hooks/useProvideHooks";

const Recommened = () => {
  const { apis } = useProvideHooks();
  const { apiSubmit, loading } = useApiSubmit();
  const [books, setBooks] = useState([]);

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

  if (loading) return <Loader />;
  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommended for you </h2>

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
        {books.length > 0 &&
          books.slice(2, 12).map((book, index) => (
            <SwiperSlide key={book._id}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default memo(Recommened);
