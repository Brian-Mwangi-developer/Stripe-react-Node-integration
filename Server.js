require("dotenv").config();
const cors = require('cors');
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)//Add stripe key

const app = express();
const corsOptions ={
    origin:"http://localhost:5173"
}
//middleware
 app.use(express.json());
 app.use(cors(corsOptions));
 app.use(express.urlencoded({extended:true}))

 //routes
 app.post("/checkout", async (req, res)=>{
  
        const session = await stripe.checkout.sessions.create({
            line_items:req.body.lineItems,
            payment_method_types:["card"],
            mode:"payment",
            success_url:"http://localhost:5173/success",
            cancel_url:"http://localhost:5173/cancel",
        });
        res.send({url:session.url});
   
})

 //listen
 PORT=8000 || process.env.port;
 app.listen(PORT,()=>
    console.log(`Server is Running on Port ${PORT}`)
 )