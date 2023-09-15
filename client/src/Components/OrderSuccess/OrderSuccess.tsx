import { useOrderContext } from "../../Context/OrderContext";
import { useEffect } from "react";
import "./OrderSuccess.css"
const OrderSuccess = () => {
  const { fetchOrderSuccess, orderCompleted } = useOrderContext();
  const itemArray = orderCompleted.item;

  useEffect(() => {
    fetchOrderSuccess();
  }, []);

  return (
    <div className="orderSuccess">
      <h1>Tack för din beställning!</h1>
      {itemArray ? (
        <div className="orderWrapper">
          <div className="orderInfo">
            <h3>Kundens mailaddress:</h3>
            <p>{orderCompleted.customer}</p>
            <h3>Dagens datum:</h3>
            <p>{orderCompleted.orderDate}</p>
           
          </div>
          <div className="orderItem">
            {itemArray.map((element) => (
              <div className="item" key={element.id}>
                <p style={{fontWeight: "bold"}}>Produktinfo:</p>
                <p>{element.description}</p>
                <p>Pris: {element.price} kr</p>
                <p>Antal: {element.quantity}</p>
              </div>
            ))}

            <h3>Totalt att betala: {orderCompleted.totalPrice / 100}</h3>
          </div>
        </div>
      ) : (
        <p>Laddar...</p>
      )}
    </div>
  );
};

export default OrderSuccess;
