require("dotenv").config();
const fs = require("fs");
const bcrypt = require("bcrypt");
const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(
  express.json(),
  cors({
    origin: "*",
  }),
  cookieSession({
    name: "user",
    keys: ["aVeryS3cr3tK3y"],
    maxAge: 1000 * 60 * 60 * 24, // 24 Hours
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  })
);

const CLIENT_URL = "http://localhost:5173";

// MiddleWares

// data från jsonfilen
const userData = require("./db/users.json");
const { log } = require("console");

// ----- CREATE USER
app.post("/create-user", async (req, res) => {
  try {
    //medskickade variabler
    const { username, email, password } = await req.body;

    // om user finns i json-filen, får client svaret false
    const user = userData.find((user) => user.email === email);
    if (user) {
      res.send(JSON.stringify(false));
      return;
    }
    // krypterar lösenordet
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        const newUser = {
          username: username,
          email: email,
          password: hash,
        };
        userData.push(newUser);
      });
    });

    // skickar ny user till stripe - Kunder
    await stripe.customers.create({
      email: req.body.email,
      description: username,
    });

    // lägger till kund i json-filen och returnerar statuskod 201
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
    // felhantering
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/api/check-cookie", (req, res) => {
  try {
    const cookie = req.session.user;
    console.log("check-cookie:",cookie);
    if (!cookie){
        res.status(200).json(false)
    } else {
     res.status(200).json(cookie)
    }
  } catch (error) {
    return res.status(404).json("Cookie finns ej");
  }
});

// ----- LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hitta användaren i databasen baserat på e-post
    const user = userData.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json("Användaren hittades inte.");
    }

    // Jämför lösenordet med hashen i databasen
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json("Felaktigt lösenord.");
    }
    req.session.user = email;
    console.log(req.session.user);
    // Om användaren lyckades logga in
    res.json(req.session.user);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/api/logout", (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(400).json("Cannot logout when you are not logged in");
    }
    req.session.user = null; // Rensa sessionen
    res.clearCookie(req.session.user);
    return res.status(200).json(req.session);
  } catch (error) {
    return res.status(404).json(error);
  }
});

app.get("/get-all-products", async (req, res) => {
  try {
    const productsArray = []
    const products = await stripe.products.list();
    products.data.map(item => {
      const newObject = {
        id: item.id,
        title: item.name,
        description: item.description,
        img: item.images,
        price_id: item.default_price,
      }
      productsArray.push(newObject)
    })

    res.status(200).json(productsArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/prices/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const price = await stripe.prices.retrieve(productId);

    // Returnera priset som JSON-svar
    res.json({
      price: price.unit_amount / 100, 
      id: req.params.productId} ); // Konverterar priset till önskat format
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

app.listen(3000, () => {
  console.log("Server is up and running...");
});
