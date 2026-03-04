
function scrollToSection() {
    const about = document.getElementById("about");
    if (about) {
        about.scrollIntoView({ behavior: "smooth" });
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    // Optionally, persist theme
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// On load, set theme from storage
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
});
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ================= Khalti Verification =================
app.post("/verify-khalti", async (req, res) => {
  try {
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      {
        token: req.body.token,
        amount: req.body.amount
      },
      {
        headers: { Authorization: "Key YOUR_SECRET_KEY" }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: "Verification Failed" });
  }
});

// ================= Connect IPS Payment =================
app.post("/connectips-pay", (req, res) => {

  const merchantId = "YOUR_MERCHANT_ID";
  const appId = "YOUR_APP_ID";
  const txnId = "TXN123456";
  const amount = "1000";
  const secretKey = "YOUR_SECRET_KEY";

  const data = merchantId + appId + txnId + amount;

  const token = crypto
    .createHmac("sha256", secretKey)
    .update(data)
    .digest("hex");

  res.redirect(`https://login.connectips.com/connectipswebgw/loginpage?MERCHANTID=${merchantId}&APPID=${appId}&TXNID=${txnId}&TXNAMT=${amount}&TOKEN=${token}`);
});

// ================= Card Payment (Example) =================
app.post("/card-pay", (req, res) => {

  const { cardNumber, expiry, cvv } = req.body;

  // ⚠️ Never store raw card data in production
  console.log("Card Received:", cardNumber);

  res.send("Card payment request received (Integrate Stripe for real use)");
});

app.listen(3000, () => console.log("Server running on port 3000"));