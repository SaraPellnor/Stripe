require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());
const CLIENT_URL = 'http://localhost:5173';


// MiddleWares
app.use(
  cors({
    origin: '*',
  })
);


app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'sek',
            product_data: {
              name: 'Gitarr',
              description: 'En bra gitarr',
            },
            unit_amount: '150000',
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
    });
console.log(session);
    res.status(200).json({url: session.url})
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error)
  }
});

app.get("/", (req, res) => {
  res.send(JSON.stringify("Hello from Express"));
});

app.listen(3000, () => {
  console.log("Server is up and running...");
});