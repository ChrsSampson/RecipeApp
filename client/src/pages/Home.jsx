import React from 'react'
import { Component } from 'react';
import {Link} from 'react-router-dom'
import sendRequest from '../../../lib/sendRequest.js';

import Searchbar from '../components/forms/searchbar';

class Home extends Component{
  constructor(props) {
    super()
    this.state = {
      recipe: null
    }
  }

  componentDidMount() {
    // commented out to limit api requests during testing
    // to keep api request down
    sendRequest('/recipe/random/api', 'GET')
      .then(res => {
        this.setState({recipe: res.data[0]})
      })
  }


  render() {
    return (
      <section className="Home">
        <h2>Hello {this.props.user ? this.props.user.username : null}</h2>
        { this.state.recipe !== null ?
          <span> we recommend the <Link to={`/client/show/${this.state.recipe.apiId}`}>{this.state.recipe.title}</Link></span>
          :
          null
        }
      </section>
    )
  }
}

export default Home;
