import React, { useState } from 'react'
import image from "../assets/background.jpg";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const HomePage = () => {
    const itemName = "Shopping Background image"
    const itemPrice = 8
    const [quantity, setQuantity] = useState(1);
    const [Amount, setAmount] = useState(itemPrice);
    const stripePromise = loadStripe(REACT_APP_STRIPE_KEY);//Add publishable Key
    const Checkout = async () => {
        const lineItems = [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: itemName,
                    },
                    unit_amount: itemPrice * 100,//multiply by 100 because it is in Cents
                },
                quantity: quantity,
            },
        ];
        try {
            const { data } = await axios.post(
                "http://localhost:8000/checkout", { lineItems },
                { headers: { "Content-Type": "application/json" } }
            );
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: data.id });
        } catch (error) {
            console.error("Checkout failed:", error);
        }
    };
    const handleDecrement = (e) => {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setAmount(Amount - itemPrice);
        } else {
            setQuantity(1);
            setAmount(Amount)
        }
    };
    const handleIncrement = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1)
        setAmount(Amount + itemPrice);
    };
    return (
        <div className='w-full mx-auto'>
            <div className='text-center font-raleway w-full max-w-5xl mx-auto my-6'>
                <div className='font-extrabold text-transparent text-6xl my-10 bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-800'>Chocolate Corner</div>
                <div className='flex flex-col lg:flex-row justify-center items-center mx-auto w-full my-16 border-2 bg-[#fcf6f6] border-slate-100 shadow-md py-4'>
                    <div className='flex lg:justify-end justify-center items-center mx-auto my-26 w-full lg:w-6/12'>
                        <img src={image} alt=" Image" />
                    </div>
                    <div className='flex flex-col lg:w-6/12 w-full py-8'>
                        <div className='text-4xl font-bold tetxt-yellow-700'>
                            {itemName}
                        </div>
                        <div className='text-3xl font-semibold my-6 text-slate-600'>
                            Price:&nbsp; &nbsp;  $ {itemPrice}
                        </div>
                        <small className='mt-10 nb-3 font-semibold'>Add Quantity</small>
                        <div className='flex text-slate-900 justify-center items-center nb-10'>
                            <span className={`select-none w-auto px-4 py-2 text-5xl bg-red-100 cursor-pointer rounded-l ${quantity === 1 ? '  cursor-not-allowed' : ''}`} onClick={handleDecrement}>-</span>
                            <span className='w-auto px-4 py-2 text-3xl font-semibold'>{quantity}</span>
                            <span className='select-none w-auto px-4 py-2 text-5xl bg-sky-200 cursor-pointer rounded-r' onClick={handleIncrement}>+</span>
                        </div>
                        <div className='my-6 text-xl'> Amount to be Paid:
                            <span className='text-green-500 text-3xl font-bold ml-3'>{Amount} $</span>
                        </div>
                        <div className='my-6'>
                                <button onClick={Checkout} 
                                className='bg-green-400 text-white px-8 py-4 rounded-md text-2xl font-semibold'>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage