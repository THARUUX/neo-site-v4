import Center from '@/components/Center';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';
import { Category } from '@/models/Category';
import { mongooseConnect } from '@/lib/mongoose';
import Link from 'next/link';
import Loading from '@/components/Loading';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function CategoriesPage({ categories , loading}) {

  if (loading) {
    return (
      <Loading />
    );
  }
  return (
    <>
      <Header />
      <div className='min-h-screen w-full flex justify-center'>
        <Center>
          <div className='py-10 sm:py-16'>
            <div className='text-2xl text-main-dark' data-aos="fade-right">Categories</div>
            <div className='w-full pt-10'>
              Available Categories
            </div>
            <div className='mt-10 w-full flex justify-between flex-wrap gap-10 sm:gap-16 category-list-container'>
              {categories?.length > 0 ? (
                categories.map(category => (
                  category?.parent?.name ? (
                    ''
                  ) : (
                    <Link key={category._id} href={`/Category/${category._id}`} className='category-container w-36 h-36 sm:w-64 sm:h-64 group/cato' data-aos='fade'>
                        {category.image ? (
                          <div className='w-full h-auto overflow-hidden'>
                            <img 
                              src={`${category.image}`} 
                              alt="" 
                              className='object-cover rounded-t-md drop-shadow-xl bg-transparent duration-500 scale-100 transition-all group-hover/cato:scale-105'/>
                          </div>
                          ) : null}
                        <div className='w-full px-5 py-3 text-xs sm:text-md text-center rounded shadow-md tracking-wider bg-white/40'>
                            {category.name}
                        </div>
                    </Link>
                  )
                ))
              ) : (
                <div>No categories found</div>
              )}
            </div>
          </div>
        </Center>
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  let loading = true;
  try {
    await mongooseConnect();
    const categories = await Category.find().populate('parent');
    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
      }
    };
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return {
      props: {
        categories: [],
      }
    };
  } finally {
    loading = false;
  }
}
