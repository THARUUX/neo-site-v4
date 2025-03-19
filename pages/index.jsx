import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Link from "next/link";
import { Category } from "@/models/Category";
import Center from "@/components/Center";

export default function HomePage({ featuredProduct, newProducts, loading, productLoading, categories }) {
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {productLoading && <Loading/>}
      <div className="flex justify-center flex-col w-screen items-center">
        <Header homeActive="open" />
        <Featured product={featuredProduct} />

        <Center>
          <div className="w-full flex flex-wrap py-20 gap-10">
                {categories?.length > 0 ? (
                  categories.map(category => (
                    category?.parent?.name ? (
                      ''
                    ) : (
                      <Link key={category._id} href={`/Category/${category._id}`} className='category-container group/cato' data-aos='fade'>
                          {category.image ? (
                            <div className='w-64 h-64 overflow-hidden'>
                              <img 
                                src={`${category.image}`} 
                                alt="" 
                                className='object-cover  drop-shadow-xl bg-transparent duration-500 scale-100 transition-all group-hover/cato:scale-105'/>
                              <div className='w-full group-hover/cato:brightness-110 duration-300 bottom-0 backdrop-blur-sm px-5 py-3 absolute text-center shadow-md tracking-wider bg-white/40'>
                                  {category.name}
                              </div>
                            </div>
                            ) : null}
                      </Link>
                    )
                  ))
                ) : (
                  <div>No categories found</div>
                )}
          </div>
        </Center>


        <NewProducts products={newProducts} />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let featuredProduct = null;
  let newProducts = [];
  let categories = [];
  let loading = true;

  try {
    await mongooseConnect();
    const featuredProductId = '664b1c9789a45de583ce7afa';
    featuredProduct = await Product.findById(featuredProductId);
    newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 3 });
    categories = await Category.find().populate('parent');
  } catch (error) {
    console.error("Error fetching data:", error.message);
  } finally {
    loading = false;
  }

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
      loading,
    },
  };
}
