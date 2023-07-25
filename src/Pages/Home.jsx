import React from 'react'
import { SideBar } from '../Components/SideBar.jsx'
import Laptop from '../Images/laptop.webp'
import Laptop2 from '../Images/laptop2.png'
import {Button} from 'react-bootstrap'

export const Home = () => {

  const openResume = () => {
    // preventDefault();
    window.open('https://drive.google.com/file/d/1yrvAEP_vMd7bNZlyj1zHgQKDBclrtkGF/view?usp=sharing', '_blank');
  }

  return (
        <>
        <div id='home' className='content-page'>
          <div className='lhs-part' >
            <img className='bouncing-image' src={Laptop} />
            <h1 className='typewriter-text' >Hello! I am Ajay.</h1>
            <span className='typewriter-cursor' ></span>
            <h6>I am a Web Developer</h6>
            <Button className='mt-3' onClick={openResume} style={{width: '70%'}}>View Resume</Button>
          </div>
          <div className='rhs-part'>
            <img className='bouncing-image big-laptop' src={Laptop2} />
          </div>
        </div>
        </>
        
  )
}
