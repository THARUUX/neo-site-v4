import Center from '@/components/Center'
import Footer from '@/components/Footer';
import Header from '@/components/Header'
import Loading from '@/components/Loading';
import { useRouter } from 'next/router';
import React , {useState , useEffect} from 'react'
import { FaSearch } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function track() {
    const router = useRouter();
    const { id } = router.query;
    const [ trackID , setTrackID] = useState(id || '');
    const [ loading , setLoading ] = useState(false);
    const [ order , setOrder ] = useState([]);

    useEffect(() => {
        if (router.query.id) {
            searchOrder(router.query.id);
            setTrackID(router.query.id);
        }
    }, [router.query.id]);

    const searchOrder = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/orders?id=${id}`, {
                method: "GET"
            });
    
            if (!res.ok) {
                const errorText = await res.text(); // Read error response
                throw new Error(`Error ${res.status}: ${errorText}`);
            }
    
            const data = await res.json(); // ✅ Ensure JSON parsing only if response is valid
            setOrder(data);
            console.log(data);
        } catch (error) {
            console.log('Error!', error.message);
            toast.error("Can't find the order. Please check the order ID and try again!", { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };
    

    if (loading) return <Loading />
    return (
        <div className='w-full flex flex-col items-center'>
            <Header />
            <Center >
                <div className="min-h-screen">
                    <div className="w-full flex justify-center my-24">
                        <div className="flex justify-center flex-col items-center gap-3">
                            <div className="text-xl">Track your order here:</div>
                            <div className='flex gap-2 items-center'>
                                <input className="w-96 py-2 px-4 border-0 focus:outline-none" value={trackID} onChange={ev => setTrackID(ev.target.value)} placeholder="Paste your order id here" type="text" />
                                <FaSearch onClick={() => searchOrder(trackID)} size={24} />
                            </div>
                        </div>
                    </div>
                    {order && order._id ? (
                        <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                            <h3 className="text-xl font-semibold mb-2 text-main">Status: {order.status || "Pending"}</h3>
                            <div className="mb-4 flex flex-col gap-2">
                                <p><strong>Order ID:</strong> {order._id}</p>
                                <p><strong>Date:</strong> {order.createdAt}</p>
                                <p><strong>Name:</strong> {order.name}</p>
                                <p><strong>Contact:</strong> {order.contactNumber}</p>
                                <p><strong>Address:</strong> {order.streetAddress}, {order.city}, {order.district}</p>
                                <p><strong>Pickup from Store:</strong> {order.pickupFromStore === "true" ? "Yes" : "No"}</p>
                            </div>

                            <h3 className="text-xl font-semibold mb-2">Products</h3>
                            
                            <ul className="border p-4 rounded-lg bg-gray-50">
                                {order.line_items.map((item, index) => (
                                    <li key={index} className="flex justify-between p-2 border-b">
                                        <span>{item.price_data.product_data.name}</span>
                                        <span>Qty: {item.quantity}</span>
                                        <span>Price: Rs {item.price_data.unit_amount / 100}/-</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-4">
                                <p><strong>Delivery Fee:</strong> Rs {order.deliveryFee}/-</p>
                                <p><strong>Total:</strong> Rs {order.Final}/-.75v</p>
                                <p><strong>Paid:</strong> {order.paid ? "Paid" : "Not Paid"}</p>
                            </div>
                        </div>
                    ) : null}
                </div>
            </Center>
            <Footer />
        </div>
    )
}
