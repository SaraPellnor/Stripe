const Pay = () => {
    async function handlePayment() {

      const paymentData = 
        [{price: '1500',
        quantity: 1
        }]
      ;

        const response = await fetch(
          'http://localhost:3000/create-checkout-session',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
          }
        );
    
        if (!response.ok) {
          return;
        }
    
        const { url } = await response.json();
        window.location = url;
      }
    

  return <button onClick={handlePayment}>Pay</button>;
};

export default Pay;
