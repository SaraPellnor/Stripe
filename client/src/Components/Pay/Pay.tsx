const Pay = () => {
    async function handlePayment() {

    

        const response = await fetch(
          'http://localhost:3000/create-checkout-session',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([]),
          }
        );
    
        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }
    
        const { url } = await response.json();
        window.location = url;
      }
    

  return <button onClick={handlePayment}>Pay</button>;
};

export default Pay;
