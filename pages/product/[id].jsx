import Center from "@/components/Center";
import Header from "@/components/Header";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductImages from "@/components/ProductImages";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import Loading from "@/components/Loading";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";

export default function ProductPage({product}) {
  const {addProduct} = useContext(CartContext);
  console.log(product.description);
  return (
    <>
      <BackButton />
      <Header />
      <div className="w-full min-h-screen flex justify-center">
      <Center>
        <div className="sm:px-10 py-10 single-product-div-1">
          <div className="sm:flex justify-center items-center gap-5  w-full single-product-div-1-1">
            <div className=" rounded p-10 w-full sm:max-w-500px sm:w-[30vw] h-auto single-product-div-1-1-1">
              <ProductImages images={product.images} />
            </div>
            <div className="px-10 sm:py-10 rounded-lg sm:w-[30vw] h-auto md:h-fit justify-between flex flex-col single-product-div-1-1-2">
              <div className="">
                <div className="text-2xl mb-5 text-main-dark">{product.title}</div>
                <p className="text-sm text-main-dark whitespace-pre-line">{product.description} </p>
              </div>
              <div className="flex gap-5 mt-5 items-center justify-between">
                <div>
                  <div className="text-xl">Rs.{product.price}</div>
                </div>
                <div>
                  <button 
                    className=" items-center flex gap-2 rounded-sm py-1 px-3 shadow-lg add-to-cart-btn" 
                    block onClick={() => addProduct(product._id)} primary outline>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-5 h-5">
                          <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                      </svg>
                      Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Center>
      </div>
      <Footer></Footer>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}
