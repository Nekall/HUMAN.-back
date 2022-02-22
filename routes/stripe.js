require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

app.post("/stripe/charge", async (req, res) => {
  let { amount, id } = req.body;
  try{
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Clothing for humans.",
      payment_method: id,
      confirm: true,
    });
    res.json({
      message: "Successful payment",
      success: true,
    });
  }catch(error){
    message: "Payment failed",
    success: false,
  }
})
