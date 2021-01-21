import React, { Component } from 'react'
import Typewriter from 'typewriter-effect'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

export default class Home extends Component {
  render() {
    return (
      <div className="bg">
        <div className="home-text">
          Land Registry
          <br /> Application
          <div className="typewriter">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 80,
                deleteSpeed: 15,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString('Trustable, Transparent and Digitized Platform')

                  .pauseFor(300)
                  .deleteChars(45)
                  .typeString('Open for all! Register Now.')
                  .pauseFor(300)
                  .start()
              }}
            />
          </div>
          <hr
            style={{
              border: '8px solid #fff',
              width: '150px',
              marginLeft: '0px',
            }}
          />
        </div>
        <div className="home-button">
          <button
            style={{ marginRight: '15px' }}
            onClick={() => this.props.history.push('/signup')}
          >
            Register
          </button>{' '}
          <button onClick={() => this.props.history.push('/login')}>
            Login
          </button>
        </div>
      </div>
    )
  }
}
