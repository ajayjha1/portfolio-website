import React from 'react'
import ReactJsLogo from '../Images/ReactJsLogo.png'
import ComputerCodingLogo from '../Images/ComputerCodingLogo.webp'
import cssIcon from '../Images/cssIcon.png'
import jsIcon from '../Images/jsIcon.png'
import cppLogo from '../Images/cppLogo.webp'
import nextJsIcon from '../Images/nextJsIcon.png'

export const Skills = () => {
  return (
        <>
        <div id='skills' className='content-page'>
          <div className='skill-page' >
            <h1>Skills</h1>
            <table>
              <tr>
                <td>
                  <img src={ReactJsLogo} width={300}/>
                  <p>ReactJs</p>
                </td>
                <td>
                  <img src={ComputerCodingLogo} width={200}/>
                  <p>HTML</p>
                </td>
                <td>
                  <img src={cssIcon} width={200}/>
                  <p>CSS</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src={jsIcon} width={200}/>
                  <p>JavaScript</p>
                </td>
                <td>
                  <img src={cppLogo}width={150} />
                  <p>OOPs</p>
                </td>
                <td>
                  <img src={nextJsIcon} width={110}/>
                  <p className='pt-3'>NextJs</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
        </>
  )
}
