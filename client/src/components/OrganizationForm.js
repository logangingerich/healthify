import React, { Component } from 'react'
import axios from 'axios'

class OrganizationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.organization.name,
      address: this.props.organization.address,
      description: this.props.organization.description
    }
  }
  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit = () => {
    const organization = {
      title: this.state.name,
      body: this.state.address,
      description: this.state.description
    }

    axios.put(
      `organizations/${this.props.organization.id}`,
      {
        organization: organization
      })
    .then(response => {
      console.log(response)
    })
    .catch(error => console.log(error))
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className='form-control' type="text"
          name="name" value={this.state.name} onChange={this.handleInput}
          placeholder='Enter Organization Name' />
        <textarea className='form-control' name="address"
          value={this.state.address} onChange={this.handleInput}
          placeholder='Address'></textarea>
        <textarea className='form-control' name="description"
          value={this.state.description} onChange={this.handleInput}
          placeholder='Description'></textarea>
      </form>
    );
  }
}

export default OrganizationForm
