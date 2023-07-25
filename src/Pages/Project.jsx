import React from 'react'
import screenshot from '../Images/screenshot.png'
import screenshot2 from '../Images/screenshot2.png'

export const Project = () => {
  return (
    <>
        <div id='projects' className='content-page'>
          <div className='projects-page' >
            <h1>Projects</h1>
            <div className='container'>
              <div className='row' >
                <div className='col-4' >
                <div className="card" style={{ width: 'fit-content', height: 'fit-content'}}>
                  <img className="card-img-top" src={screenshot} alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">E-commerce App</h5>
                      <p className="card-text">
                        <ul>
                          <li>App built using MERN</li>
                          <li>Redux as a state management system</li>
                          <li>Google firebase for sign-up/sign-in</li>
                          {/* <li>fetures like signup, signin, add to cart, admin dashboard etc.</li> */}
                        </ul>
                      </p>
                      <a href="https://github.com/ajayjha1/ecommerce-app" target='_blak' className="btn btn-primary">View Code</a>
                    </div>
                  </div>
                </div>
                <div className='col-4' >
                <div className="card" style={{ width: 'fit-content', height: 'fit-content' }}>
                  <img className="card-img-top" src={screenshot2} alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">Personal Portfolio website</h5>
                      <p className="card-text">
                        <ul>
                          <li>Personal Portfolio website using reactjs</li>
                          <li>animated icons</li>
                          <li>Clean and beautiful design.</li>
                          <li>Responsive design.</li>
                        </ul>
                      </p>
                      <a href="https://github.com/ajayjha1/portfolio-website" target='_blak' className="btn btn-primary">View Code</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}
