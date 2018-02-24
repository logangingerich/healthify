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
      name: "",
      address: "",
      description: ""
    }
  }
  componentDidMount() {
    axios.get('/organizations.json')
    .then(response => {
      this.setState({
        organizations: response.data,
        selectedOrgName: response.data[0].name,
        selectedOrgAddress: response.data[0].address,
        selectedOrgDescription: response.data[0].description
      })
    })
    .catch(error => console.log(error))
  }
  getOrg = (orgID) => {
    axios.get(`/organizations/${orgID}`)
    .then(response => {
      this.setState({
        selectedOrgName: response.data.name,
        selectedOrgAddress: response.data.address,
        selectedOrgDescription: response.data.description
      })
    })
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
        name: "",
        address: "",
        description: ""
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
    let {selectedOrg} = this.state
    return (
      <div className="container-fluid">
        <div className="form">
          <div className="row">
            <div className="col-sm-8">
              <form onSubmit={this.handleSubmit}>
                <input className='form-control' type="text"
                  name="name" value={this.state.name} onChange={this.handleInput}
                  placeholder='Enter Organization Name' />
                <textarea className='form-control' name="address"
                  value={this.state.address} onChange={this.handleInput}
                  placeholder='Address'></textarea>
              </form>
            </div>
            <div className="col-sm-4">
              <form>
                <textarea className='form-control' name="description"
                  value={this.state.description} onChange={this.handleInput}
                  placeholder='Description'></textarea>
                <br></br>
                <button className="btn btn-success" onClick={this.addNewOrg}>Add Organization</button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            {this.state.organizations.map((organization) => {
              return (
                <div className="tile" key={organization.id}>
                  <button onClick={() => this.getOrg(organization.id)}>{organization.name}</button>
                  <p>{organization.address}</p>
                </div>
              )
            })}
          </div>
          <div className="col-sm-8">
            <h4>{this.state.selectedOrgName}</h4>
            <p>{this.state.selectedOrgAddress}</p>
            <p>{this.state.selectedOrgDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default OrganizationsContainer
