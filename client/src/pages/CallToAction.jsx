import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-orange-400 justify-center items-center rounded-tl-3xl rounded-br-3xl'>
        <div className='flex-1 p-7 justify-center flex flex-col'>
            <h2 className='text-3xl my-2' >You can advertise to here</h2>
            <p className='my-4 text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat feugiat nisi eget semper. Quisque augue risus, faucibus eu turpis ac, varius vehicula enim</p>
            <Link to={'/about'}>
                <Button className='w-full' gradientDuoTone="pinkToOrange">Click Here For Advertise</Button>
            </Link>
        </div>
        <div className=' flex-1 p-7' style={{}}>
            <img src="https://images.pexels.com/photos/2763246/pexels-photo-2763246.jpeg" alt="advertisement" />
        </div>
    </div>
  )
}
