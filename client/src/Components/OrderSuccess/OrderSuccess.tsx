import { useOrderContext } from "../../Context/OrderContext";
import { useEffect } from "react";
import { useProductContext } from "../../Context/ProductContext";
import "./OrderSuccess.css";

// Visas om ordern lyckades med alla orderinfo. 
// Om ordern inte visas så visas ett meddelande om var du kan hitta ordern. 

const OrderSuccess = () => {
  const { fetchOrderSuccess, orderCompleted } = useOrderContext();
  const { setInCartLength } = useProductContext();
  const itemArray = orderCompleted.item;

  useEffect(() => {
    window.scrollTo(0, 410);
    setInCartLength(0);
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
            <p style={{ fontWeight: "bold" }}>Produktinfo:</p>
            {itemArray.map((element) => (
              <div className="item" key={element.id}>
                <p>{element.description}</p>
                <p>Pris: {element.price} kr</p>
                <p>Antal: {element.quantity}</p>
              </div>
            ))}

            <h3>Totalt att betala: {orderCompleted.totalPrice / 100}</h3>
          </div>
        </div>
      ) : (
        <h3>Var inte rädd. Din orderinfo finns på dina sidor.</h3>
      )}
    </div>
  );
};

export default OrderSuccess;
