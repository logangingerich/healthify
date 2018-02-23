import React, { Component } from 'react'
import Organization from './organization'
import OrganizationForm from './OrganizationForm'
import axios from 'axios'
import update from 'immutability-helper'

class OrganizationsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      organizations: [],
      editingOrganizationId: null,
      name: "",
      address: "",
      description: ""
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
  addNewOrg = () => {
    axios.post(
      '/organizations',
      { organization:
        {
          name: this.state.name,
          address: this.state.address,
          description: this.state.description
        }
      }
    )
    .then(response => {
      console.log(response)
      const organizations = update(this.state.organizations, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({
        organizations: organizations,
        editingOrganizationId: response.data.id
      })
    })
    .catch(error => console.log(error))
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
      <div>
        <div className="form">
          <div>
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
            <br></br>
            <button className="btn btn-success" onClick={this.addNewOrg}>Add Organization</button>
          </div>
        </div>
        <div>
          {this.state.organizations.map((organization) => {
            return (<Organization organization={organization} key={organization.id} />)
          })}
        </div>
      </div>
    );
  }
}

export default OrganizationsContainer
