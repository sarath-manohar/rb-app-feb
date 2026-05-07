import React from 'react'
import { MdAttachEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div style={{height:'400px',backgroundColor:'blue'}} className='d-flex justify-content-center align-items-center text-light' >
      <div className='text-center'>
        <h1>Contact Us</h1>
        <h5><MdAttachEmail /> resumebuilder@gmail.com</h5>
        <h5><FaPhoneAlt /> 9087654321</h5>
        <h4>Connect With Us</h4>
        <div className="d-flex justify-content-center fs-4 mt-3">
          <FaWhatsapp className='me-3'/>
          <FaFacebookF className='me-3'/>
          <FaInstagram />
        </div>
        <p className="mt-3">Designed & built with ❤️ using React</p>
      </div>
    </div>
  )
}

export default Footer