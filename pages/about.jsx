import BackButton from '@/components/BackButton'
import Center from '@/components/Center'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image'
import React from 'react'
import logo from '../public/neologo.v.0.png'

export default function about() {
  return (
    <div className='min-h-screen min-w-screen flex flex-col items-center'>
        <BackButton />
        <Header />
        <Center className="border border-black">
            <div className='py-24 min-h-screen flex '>
                <div className='w-full sm:w-1/2 h-[70vh]'>
                    <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.239367672977!2d79.9050783!3d6.8618908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a6383048285%3A0xdd52a14b84862fb2!2sNEO%20Graphics!5e0!3m2!1sen!2slk!4v1742381276343!5m2!1sen!2slk"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className='w-full sm:w-1/2 h-[70vh] flex justify-center items-center flex-col'>
                    <div className='w-full flex justify-center p-10' data-aos="fade">
                        <Image src={logo} alt='neo logo'  width={100}/>
                    </div>
                    <div data-aos="fade-right" className='text-center justify-center flex'>
                    Neo gives you the promise of the best Quality to Price ratio in the Sri Lankan print industry.
                    </div>
                    <div className="w-full flex flex-col items-center mt-5 gap-2">
                    <div className='flex text-sm gap-2 text-main'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            info@neo.lk
                        </div>
                        <div className='flex text-sm gap-2 text-main'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                            +94 112 820 220
                        </div>
                        <div className='flex text-sm gap-2 text-main'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                            +94 768 261 165
                        </div>
                    </div>
                </div>
            </div>
        </Center>
        <Footer/>
    </div>
  )
}
