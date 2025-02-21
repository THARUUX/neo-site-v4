import Center from '@/components/Center'
import Header from '@/components/Header'
import React , {useState} from 'react'

export default function track() {
    const [ trackID , setTrackID] = useState('');
  return (
    <div className='w-full flex flex-col items-center'>
        <Header />
        <Center>
            <div className="w-full flex justify-center my-24">
                <div className="flex justify-center flex-col items-center gap-3">
                    <div className="text-xl">Track your order here:</div>
                    <input className="w-96 py-2 px-4 focus:outline-none" value={trackID} onChange={ev => setTrackID(ev.target.value)} placeholder="Paste your order id here" type="text" />
                </div>
            </div>
        </Center>
      
    </div>
  )
}
