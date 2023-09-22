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
const orderData = require("./db/orders.json");
const userData = require("./db/users.json");


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
    // skickar ny user till stripe - Kunder
    const response = await stripe.customers.create({
      email: email,
      description: username,
    });
    // krypterar lösenordet
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        const newUser = {
          id: response.id,
          username: username,
          email: email,
          password: hash,
        };
        userData.push(newUser);
        console.log(newUser);
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
      });
    });

    return res.status(201).json(response.id);
    // felhantering
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/api/check-cookie", (req, res) => {
  try {
    const cookie = req.session.user;
    if (!cookie) {
      res.status(200).json(false);
    } else {
      res.status(200).json(cookie);
    }
  } catch (error) {
    return res.status(404).json("Cookie finns ej");
  }
});

// ----- LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password, id } = req.body;

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
    req.session.user = user;
    // Om användaren lyckades logga in
    res.json(req.session.user);
  } catch (error) {
    res.status(500).json(error);
  }
});
// ----- LOGOUT
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

// ----- GET ALL PRODUCTS
app.get("/get-all-products", async (req, res) => {
  try {
    const productsArray = [];
    const products = await stripe.products.list();
    for (const item of products.data) {
      const price = await stripe.prices.retrieve(item.default_price);
      const newObject = {
        id: item.id,
        title: item.name,
        description: item.description,
        img: item.images,
        price: price.unit_amount_decimal / 100,
        quantity: 1,
        default_price: item.default_price,
      };
      productsArray.push(newObject);
    }

    res.status(200).json(productsArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----- CREATE CHECKOUT SESSION
app.post("/create-checkout-session", async (req, res) => {
  try {
    console.log(req.body);
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.order,
      mode: "payment",
      customer: req.body.user,
      allow_promotion_codes: true,
      success_url: `${CLIENT_URL}/order-succsess`,
      cancel_url: `${CLIENT_URL}/order-faild`,
    });

    res.status(200).json({ url: session.url, session_id: session.id });
  } catch (error) {
    res.status(400).json(error);
  }
});

// ----- ORDER SUCCESS - Hämtar specifik order
app.get("/order-success/:id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id, {
      expand: ["line_items"],
    });
    console.log("customer",session.customer);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const user = session.customer;
    console.log("user", user);
    const items = session.line_items.data.map((element) => ({
      id: element.id,
      price: element.amount_total,
      description: element.description,
      quantity: element.quantity,
    }));
    const order = {
      orderId: req.params.id,
      orderDate: formattedDate,
      totalPrice: session.amount_total,
      item: items,
      customer: session.customer_details.name,
    };
    console.log(orderData);
    if (orderData.hasOwnProperty(user)) {
      console.log("användaren har en order");
      orderData[user].push(order);
    } else {
      console.log("användarens första order");
      orderData[user] = [order];
    }

    fs.writeFile(
      "./db/orders.json",
      JSON.stringify(orderData, null, 2),
      (err) => {
        if (err) {
          res.status(404).send(err);
        }
      }
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
});

// ----- ORDERS - hämtar alla user orders
app.get("/orders/:id", async (req, res) => {
  try {
    const orders = orderData[req.params.id]
  console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(3000, () => {
  console.log("Server is up and running...");
});
