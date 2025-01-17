import { Button } from "@mui/material";
import React, { memo, useCallback, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import useReduxHooks from "../../hooks/useReduxHooks";

const QuantityBox = ({ qty, id }) => {
  const { dispatch, cartActions, cart } = useReduxHooks();

  // const handleAddToCart = useCallback(
  //   (product) => {
  //     dispatch(cartActions.addToCart(product));
  //   },
  //   [dispatch, cartActions]
  // );
  const [quantity, setQuantity] = useState(qty);

  const increment = useCallback(() => {
    const existingItem = cart.find((item) => item._id === id);
    if (existingItem) {
      dispatch(cartActions.addToCart({ ...existingItem, quantity: 1 }));
    }

    setQuantity((prev) => prev + 1);
  }, [quantity]);

  const decrement = useCallback(() => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
  }, [quantity]);

  return (
    <div className="qtybox flex items-center relative">
      <input
        type="number"
        value={quantity}
        className="w-full  h-10 p-2 pl-5  text-base focus:outline-none rounded-md border border-solid border-[rgba(0,0,0,0.2)]"
      />
      <div className="flex items-center flex-col justify-between h-10 absolute top-0 right-0 z-50  ">
        <Button
          className="!min-w-8 !w-8 !h-5 !text-[#000] !rounded-none hover:!bg-[#f1f1f1]   "
          onClick={increment}
        >
          <FaAngleUp className="text-sm opacity-55" />
        </Button>

        <Button
          className="!min-w-8 !w-8 !h-5 !text-[#000] !rounded-none  hover:!bg-[#f1f1f1]  "
          onClick={decrement}
        >
          <FaAngleDown className="text-sm opacity-55" />
        </Button>
      </div>
    </div>
  );
};

export default memo(QuantityBox);
