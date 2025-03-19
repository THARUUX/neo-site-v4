import Header from "@/components/Header";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { useState } from "react";

export default function ProductsPage({ products, loading }) {
  const [search, setSearch] = useState("");

  if (loading) {
    return <Loading />;
  }

  const searchTerm = search.toLowerCase();

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
  );

  //console.log(filteredProducts);

  return (
    <>
      <Header />
      <div className="w-full min-h-screen flex justify-center">
        <Center>
          <div className="py-16">
            <div className="text-2xl tracking-tight mb-10" data-aos="fade-right">
              {search.length > 0 ? (
                <div>
                  Search results for: <span className="text-main">{search}</span>
                </div>
              ) : (
                "All Products"
              )}
            </div>
            <div className="px-5 mb-10">
              <input
                className="border-0 w-full focus:outline-none"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
              />
            </div>
            <ProductsGrid products={filteredProducts} />
          </div>
        </Center>
      </div>
      <Footer />
    </>
  );
}


export async function getServerSideProps() {
  let loading = true;
  try{
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    return {
      props:{
        products: JSON.parse(JSON.stringify(products)),
      }
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
  } finally{
    loading = false;
  }
}
