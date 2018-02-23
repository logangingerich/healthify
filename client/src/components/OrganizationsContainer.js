import React, { Component } from 'react'
import axios from 'axios'

class OrganizationsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      organizations: []
    }
  }
  componentDidMount() {
    axios.get('/organizations.json')
    .then(response => {
      console.log(response)
      this.setState({organizations: response.data})
    })
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div>
        {this.state.organizations.map((org) => {
          return(
            <div key={org.id} >
              <h4>{org.name}</h4>
              <p>{org.body}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export default OrganizationsContainer
