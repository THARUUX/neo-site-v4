import React from 'react'

export default function Center({children}) {
  return (
    <>
      <div className='m-0 px-10 md:px-20 max-w-[1500px] w-full'>
        {children}
      </div>
    </>
  );
}