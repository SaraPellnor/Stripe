import "./OrderFaild.css";

// Visas om order faild från Stripe

const OrderFaild = () => {
  return (
    <div className="orderFaild">
      <h1>Oj!</h1>
      <h4>Av någon oväntad anledning kunde inte köpet genomföras.</h4>
      <h3>
        Du har alltså INTE betalat eller skickat iväg någon oder till oss.
      </h3>
      <h4>Försök gärna igen.</h4>
      <h5>Om det fortfarande inte går, bör du se över ditt saldo på kortet!</h5>
    </div>
  );
};

export default OrderFaild;
