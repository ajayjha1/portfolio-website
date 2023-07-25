import React from 'react'
import { BiLogoGmail } from 'react-icons/bi';
import {IoIosCall} from 'react-icons/io'
import {FaGithubSquare} from 'react-icons/fa'
import {FaLinkedinIn} from 'react-icons/fa'

export const Contact = () => {

  const navigateToMail = () =>{
    window.open('mailto:ajayjha1886@gmail.com', '_blank')
  }

  const navigateToPhoneCall = () => {
    window.open('tel:+918744833964', '_blank');
  };

  const navigateToGitHub = () =>{
    window.open('https://github.com/ajayjha1', '_blank')
  }
  const navigateToLinkedIn = () =>{
    window.open('https://www.linkedin.com/in/ajay-jha-1a5ab9173/', '_blank')
  }

  return (
    <>
        <div id='contact' className='content-page'>
            <div className='contact-page' >
            <h1>Contact</h1>
            <div className='contact-inner'>
              <div className='contact-inner-element' >
                <BiLogoGmail onClick={navigateToMail} size={60} />&nbsp;&nbsp;&nbsp;
                <span>ajayjha1886gmail.com</span>
              </div>
              <div onClick={navigateToPhoneCall} className='contact-inner-element' >
                <IoIosCall size={60} />&nbsp;&nbsp;&nbsp;
                <span>+91-8744833964</span>
              </div>
              <div onClick={navigateToGitHub} className='contact-inner-element' >
                <FaGithubSquare size={60} />&nbsp;&nbsp;&nbsp;
                <span>github.com/ajayjha1</span>
              </div>
              <div onClick={navigateToLinkedIn} className='contact-inner-element' >
                <FaLinkedinIn size={60} />&nbsp;&nbsp;&nbsp;
                <span>https://www.linkedin.com/in/ajay-jha-1a5ab9173/</span>
              </div>
            </div>
        </div>
        </div>
    </>
  )
}
