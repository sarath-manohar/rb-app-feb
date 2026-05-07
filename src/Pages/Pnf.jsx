import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <div>
    <div className=' d-flex justify-content-center align-items-center'>
      <img className='w-75' src="https://webytag.com/wp-content/uploads/2024/07/c19fc414b5c17a9e286bd53c5ab19e7c.gif" alt="pnf" />
     <div>
      <p>Oh No!</p>
      <h3 className='text-warning text-center'>Look Like You're Lost</h3>
      <p>The page you are looking for is not available</p>
      <Link to={'/'}  className='bg-black px-3 py-2 text-light my-5'>Home</Link>
     </div>
    </div>
    </div>
  )
}

export default Pnf
