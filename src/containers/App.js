import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Explore from '../components/Explore'
import { resetErrorMessage } from '../actions'

import { Appbar, Container } from 'muicss/react';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange(nextValue) {
    browserHistory.push(`/${nextValue}`)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
          onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    //const fb_icon = 'M608 192h160v-192h-160c-123.514 0-224 100.486-224 224v96h-128v192h128v512h192v-512h160l32-192h-192v-96c0-17.346 14.654-32 32-32z'
    const icon = 'M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z'
    const { children, inputValue } = this.props
    return (
      <div>
        <Appbar>
          ☰ Foo
          <div className="mui--text-right">
            <svg>
              <path d={icon}></path>
            </svg>
          </div>
        </Appbar>
        <Container>
          <Explore value={inputValue}
            onChange={this.handleChange} />
          <hr />
          {this.renderErrorMessage()}
          {children}
        </Container>
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    inputValue: ownProps.location.pathname.substring(1)
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage
})(App)
