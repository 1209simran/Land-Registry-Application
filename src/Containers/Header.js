import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreIcon from '@material-ui/icons/MoreVert'
import Land from '../abis/LandRegistry.json'
import Button from '@material-ui/core/Button'

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
})

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: false,
      mobileMoreAnchorEl: false,
      authenticated: false,
    }
  }
  componentDidMount = async () => {
    const web3 = window.web3
    const acc = await window.localStorage.getItem('web3account')
    this.setState({ account: acc })
    // console.log(acc)
    const networkId = await web3.eth.net.getId()
    const LandData = Land.networks[networkId]
    if (LandData) {
      const landList = new web3.eth.Contract(Land.abi, LandData.address)
      this.setState({ landList })
    } else {
      window.alert('Token contract not deployed to detected network.')
    }
    if (window.localStorage.getItem('authenticated') === 'true')
      this.setState({ authenticated: true })
  }
  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: false })
  }

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: true })
  }
  render() {
    const { classes } = this.props
    const mobileMenuId = 'primary-search-account-menu-mobile'

    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={this.state.mobileMoreAnchorEl}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <Button
            color="inherit"
            onClick={() => {
              window.localStorage.setItem('authenticated', false)
              window.location = '/login'
            }}
          >
            Logout
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            color="inherit"
            onClick={() => {
              window.location = '/login'
            }}
          >
            Login
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            color="inherit"
            onClick={() => {
              window.location = '/signup'
            }}
          >
            SignUp
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            color="inherit"
            onClick={() => {
              window.location = '/govt_login'
            }}
          >
            Government Login
          </Button>
        </MenuItem>
      </Menu>
    )

    return (
      <div>
        <div className={classes.grow}>
          {/* {console.log(this.state.authenticated)} */}
          <header id="header">
            <nav id="nav-wrap">
              <a
                className="mobile-btn"
                href="#nav-wrap"
                title="Show navigation"
              >
                Show navigation
              </a>
              <a
                className="mobile-btn"
                href="#nav-wrap"
                title="Hide navigation"
              >
                Hide navigation
              </a>
              <ul id="nav" className="nav">
                <li>
                  <a
                    className="smoothscroll"
                    onClick={() => {
                      window.location = '/'
                    }}
                  >
                    Home
                  </a>
                </li>
                {this.state.authenticated == false && (
                  <div>
                    <li>
                      <a
                        className="smoothscroll"
                        onClick={() => {
                          window.location = '/login'
                        }}
                      >
                        Login
                      </a>
                    </li>
                    <li>
                      <a
                        className="smoothscroll"
                        onClick={() => {
                          window.location = '/signup'
                        }}
                      >
                        Sign Up
                      </a>
                    </li>
                    <li>
                      <a
                        className="smoothscroll"
                        onClick={() => {
                          window.location = '/govt_login'
                        }}
                      >
                        Government Login
                      </a>
                    </li>
                  </div>
                )}

                {this.state.authenticated == true && (
                  <div>
                    <li>
                      <a
                        className="smoothscroll"
                        onClick={() => {
                          window.location = '/dashboard'
                        }}
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        className="smoothscroll"
                        onClick={() => {
                          window.location = '/profile'
                        }}
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        className="smoothscroll"
                        onClick={() => {
                          window.localStorage.setItem('authenticated', false)
                          window.location = '/login'
                        }}
                      >
                        Logout
                      </a>
                    </li>
                  </div>
                )}
                <li>
                  <a
                    className="smoothscroll"
                    onClick={() => {
                      window.location = '/guide'
                    }}
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </nav>
          </header>
          {/* <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title} variant="h6" noWrap>
                Land Registry Application
              </Typography>

              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <Button color="inherit">Home</Button>

                {this.state.authenticated == false && (
                  <div>
                    <Button
                      color="inherit"
                      onClick={() => {
                        window.location = '/login'
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => {
                        window.location = '/signup'
                      }}
                    >
                      SignUp
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => {
                        window.location = '/govt_login'
                      }}
                    >
                      Government Login
                    </Button>
                  </div>
                )}
                {this.state.authenticated == true && (
                  <div>
                    {' '}
                    <Button
                      color="inherit"
                      onClick={() => {
                        window.location = '/dashboard'
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => {
                        window.location = '/profile'
                      }}
                    >
                      Profile
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => {
                        window.localStorage.setItem('authenticated', false)
                        window.location = '/login'
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={this.handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar> */}
          {renderMobileMenu}
          {/* {renderMenu} */}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Header)
