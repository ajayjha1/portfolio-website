import React from 'react';
import ReactJsLogo from '../Images/ReactJsLogo.png'

export const About = () => {
  return (
        <>
            <div id='about' className='content-page'>
                <div className='about-page' >
                <h1>About</h1>
                
                <div className='about-us-text'>
                  <q>
                    Hello, I am Ajay. I have good knowledge of ReactJs, HTML, CSS.
                    I am a Eager and dedicated software developer with a strong foundation in programming and a passion for building innovative solutions.  Seeking an entry-level position in a dynamic organization where I can apply my skills and contribute to the development of cutting-edge software applications.<br/>
                    <br/>
                    At the heart of Ajay's work lies a relentless dedication to crafting software solutions that push the boundaries of innovation. With an unwavering commitment to excellence, Ajay brings forth a wealth of knowledge and expertise, ensuring that every project is developed with precision and ingenuity.
                  </q>
                </div>
                {/* <div>
                  <img src={ReactJsLogo} width={'200px'}/>
                </div> */}
                </div>
            </div>
        </>
  )
}
