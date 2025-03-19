import "@/styles/globals.css";
import {CartContextProvider} from "@/components/CartContext";
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import 'animate.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
         duration: 800,
         once: false,
       })
 }, []);
  return (
    <>
      <CartContextProvider>
        <ToastContainer>
          <Component {...pageProps} />
        </ToastContainer>
      </CartContextProvider>
    </>
  );
}
