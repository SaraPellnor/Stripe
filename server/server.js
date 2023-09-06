require("dotenv").config();
const fs = require("fs");
const bcrypt = require("bcrypt")
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());
const CLIENT_URL = "http://localhost:5173";

// MiddleWares
app.use(
  cors({
    origin: "*",
  })
);

const userData = require("./db/users.json");

app.post("/create-user", async (req, res) => {
  try {
    
    const {email, password} = req.body
    const user = userData.find((user) => user.email === email);
    if (user) { 
      res.send(JSON.stringify("samma"))
      return
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
      } else {
        
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
           console.log(err);
          } else {
          
            console.log('Krypterat lösenord:', hash);
            const newUser = {
              email: email,
              password: hash
            }
            userData.push(newUser);
          }
        });
      }
    });
    

    await stripe.customers.create({
      email: req.body.email,
      description: "Ny användare i Stripe",
    });
    
    fs.writeFile(
      "./db/users.json",
      JSON.stringify(userData, null, 2),
      (err) => {
        if (err) {
          res.status(404).send(err);
        }
      }
    );
    return res.status(201).json(userData);
  } catch (error) {
    console.error("Fel vid skapande av användare:", error);
    res
      .status(500)
      .json({ error: "Något gick fel vid skapande av användare." });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Hitta användaren i databasen baserat på e-post
  const user = userData.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ error: "Användaren hittades inte." });
  }

  // Jämför lösenordet med hashen i databasen
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Felaktigt lösenord." });
  }

  // Om användaren lyckades logga in
  res.json({ message: "Inloggning lyckades!" });
});

app.get("/get-all-products", async (req, res) => {
  try {
    const products = await stripe.products.list();
    res.json(products.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "sek",
            product_data: {
              name: "Gitarr",
              description: "En bra gitarr",
            },
            unit_amount: "150000",
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
    });
    console.log(session);
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error);
  }
});

app.get("/", (req, res) => {
  res.send(JSON.stringify("Hello from Express"));
});

app.listen(3000, () => {
  console.log("Server is up and running...");
});
