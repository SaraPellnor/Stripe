import { useOrderContext } from "../../Context/OrderContext";
import { useEffect } from "react";

const OrderSuccess = () => {
  const { fetchOrderSuccess, orderCompleted } = useOrderContext();

  useEffect(() => {
    fetchOrderSuccess();
  }, []);

  return (
    <>
      <div>{orderCompleted.customer}</div>
      <div>{orderCompleted.orderDate}</div>
      <div>{orderCompleted.totalPrice}</div>
    </>
  );
};

export default OrderSuccess;
