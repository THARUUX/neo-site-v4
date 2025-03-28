import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/components/CartContext';
import Header from '@/components/Header';
import Center from '@/components/Center';
import axios from 'axios';

export default function Thank() {
    const { clearCart } = useContext(CartContext);
    const [lOI, setLOI] = useState('');

    useEffect(() => {
        // Perform actions once when the component mounts
        clearCart();
        localStorage.removeItem('cart');

        // Fetch the last order ID
        const lastOrderId = async () => {
            try {
                const orderList = await axios.get('/api/orders');
                console.log(orderList.data[41]);

                if (orderList.data.length > 0) {
                    const lastOrder = orderList.data[0];
                    setLOI(lastOrder._id);
                }
            } catch (error) {
                console.error('Error Fetching orders:', error);
            }
        };

        lastOrderId();  // Fetch the last order ID after the cart is cleared
    }, []);  // Empty dependency array ensures this effect runs only once on mount

    const handleBackClick = () => {
        window.location.href = "/";
    };

    return (
        <div className='w-full flex flex-col items-center'>
            <Header />
            <Center>
                <div className='w-full h-screen flex justify-center items-center'>
                    <div className='flex justify-center flex-col'>
                        <h1 className='text-3xl text-center'>Thanks for your order!</h1>
                        <p className="text-center">We will contact you when your order is sent.</p>
                        {lOI && (
                            <p className='text-center mt-4 font-bold' title="This can be used for track your order status">Your last order ID is: {lOI}</p>
                        )}
                        <div className='text-center flex justify-center'>
                            <button onClick={handleBackClick} className='btn bg-lime-500 text-white py-1 mt-5 px-5 rounded shadow-md flex gap-2 items-center'>
                                Back
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </Center>
        </div>
    );
}
