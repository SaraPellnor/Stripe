import { useEffect } from "react";
import "./Orders.css";
import { useNavigate } from "react-router-dom";
import { IOrdersItems, useOrderContext } from "../../Context/OrderContext";

const Orders = () => {
  const navigateTo = useNavigate();
  const { fetchOrders, orders } = useOrderContext();

  useEffect(() => {
    window.scrollTo(0, 410);
    !localStorage.getItem("userId") && navigateTo("/login");
    fetchOrders();
  }, []);

  return (
    <div className="orders">
      {orders[0] ? (
        <div>
          <h1>Dina tidigare ordrar</h1>
          <table>
            <thead>
              <tr>
                <th>Datum</th>
                <th>Köpare</th>
                <th>Varor</th>
                <th>Antal</th>

                <th>Totalpris</th>
              </tr>
            </thead>
            {orders.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{item.orderDate}</td>
                    <td>{item.customer}</td>
                    <td>
                      {item.item.map((object: IOrdersItems, index) => (
                        <p key={index}>{object.description}</p>
                      ))}
                    </td>
                    <td>
                      {item.item.map((object: IOrdersItems, index) => (
                        <p key={index}>{object.quantity} st</p>
                      ))}
                    </td>

                    <td>{item.totalPrice / 100} kr</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      ) : (
        <h1>Du har inte lagt några ordrar ännu!</h1>
      )}
    </div>
  );
};

export default Orders;
