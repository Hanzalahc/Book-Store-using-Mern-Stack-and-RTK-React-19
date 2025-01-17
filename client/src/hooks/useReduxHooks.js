import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  loginUser,
  signInWithGoogle,
  logoutUser,
  setCurrentUser,
} from "../store/auth-slice";
import { cartActions } from "../store/cart-slice";
import { adminActions } from "../store/admin-slice";

const useReduxHooks = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const admin = useSelector((state) => state.admin);

  return {
    dispatch,
    auth,
    setCurrentUser,
    cart,
    cartActions,
    registerUser,
    loginUser,
    signInWithGoogle,
    logoutUser,
    admin,
    adminActions,
  };
};

export default useReduxHooks;
