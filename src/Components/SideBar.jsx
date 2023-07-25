import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import myphoto from '../Images/myphoto.jpeg'

export const SideBar = () => {

  // const navigate = useNavigate()

  // const navigateToHome = () =>{
  //   navigate('/')
  // }
  // const navigateToAbout = () =>{
  //   navigate('/about')
  // }
  // const navigateToSkills = () =>{
  //   navigate('/skills')
  // }

  // const navigateToProject = () =>{
  //   navigate('/project')
  // }

  // const navigateToEducation = () =>{
  //   navigate('/education')
  // }
  // const navigateToContact = () =>{
  //   navigate('/contact')
  // }

  return (
    <div>
        <div className='sidebar text-center' >

            <img className='author-img' src={myphoto} />
            <h1>Ajay Kumar</h1>
            <span>
                <a href='#'>SOFTWARE DEVELOPER</a>
                 &nbsp;IN DELHI
            </span>
            <div>
              <ul className=''>
                <li><a href='#home' >HOME</a></li>
                <li><a href='#about' >ABOUT</a></li>
                <li><a href='#skills' >SKILLS</a></li>
                <li><a href='#projects' >PROJECT</a></li>
                {/* <li><a href='#education' >EDUCATION</a></li> */}
                <li><a href='#contact' >CONTACT</a></li>
              </ul>
            </div>
        </div>
    </div>
  )
}
