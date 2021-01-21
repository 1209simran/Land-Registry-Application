import React, { Component } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

const styles = () => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: '18px',
    fontWeight: 600,
  },
})

class Help extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className="profile-bg">
        <Container style={{ marginTop: '100px' }} className={classes.root}>
          <div className="faq-text">FAQ</div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                How to enroll to this application?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Visit http://localhost:3000/signup to register on the platform.
                You have to provide the following details to the form:-
                <li>Name</li>
                <li>Email Address</li>
                <li>Contact Number</li>
                <li>Private Key (Account Address)</li>
                <li>City</li>
                <li>Postal Code</li>
                Click on the submit button and you will be redirected to login
                page. To login, you have to provide your private key and click
                on the login button.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                What is the procedure to register the property?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                To register the property, you must login to your account. Click
                on the dashboard and you will find three tabs there, then go to
                the "Register Land" tab where you will be asked to fill the
                details related the property and onwer. After submitting the
                form your application is then verified by the government
                authority.
                <br />
                In "My Properties" section on the dashboard you can check the
                status of your land. If it is accepted by the government then
                you can make your land available to the buyers and if declined,
                you have to submit the new application.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                How to buy the property?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                To buy the property, you must login to your account. Click on
                the dashboard and you will find three tabs there, then go to the
                "Available Properties" tab where you will find the available
                properties and you can request access to the land owner in order
                to buy.
                <br />
                Land Owner will receive the request and they are allowed to
                accept/decline by verifying requester details. If accepted,
                buyer can now make transaction and the ownership of previous
                land will be removed and the amount get transferred to the land
                owner. If rejected, then land will again be available to the
                users.
                <br />
                To check the wallet balance, they can visit to their profile
                section.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </div>
    )
  }
}

export default withStyles(styles)(Help)
