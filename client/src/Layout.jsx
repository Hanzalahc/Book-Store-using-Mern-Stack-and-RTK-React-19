import { Outlet, useLocation } from "react-router-dom";
import { Header, Footer } from "./components";
import { listenToAuthState } from "./store/auth-slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listenToAuthState());
  }, [dispatch]);

  const location = useLocation();

  // Pages where header, footer should be hidden
  const hideHeaderFooter = ["/login", "/register"];
  const shouldHideHeaderFooter = hideHeaderFooter.includes(location.pathname);
  return (
    <>
      {!shouldHideHeaderFooter && <Header />}

      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
        <Outlet />
      </main>

      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
