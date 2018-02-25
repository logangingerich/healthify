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
      description: "",
      selectedServices: [],
    }
  }
  componentDidMount() {
    axios.get('/organizations.json')
    .then(response => {
      this.setState({
        organizations: response.data,
        selectedOrgName: response.data[0].name,
        selectedOrgAddress: response.data[0].address,
        selectedOrgDescription: response.data[0].description,
        selectedOrgID: response.data[0].id
      })
    })
    .catch(error => console.log(error))
    axios.get('/organizations/1')
    .then(response => {
      this.setState({
        selectedServices: response.data._embedded.services
      })
    })
  }
  getOrg = (orgID) => {
    axios.get(`/organizations/${orgID}`)
    .then(response => {
      this.setState({
        selectedOrgName: response.data.name,
        selectedOrgAddress: response.data.address,
        selectedOrgDescription: response.data.description,
        selectedOrgID: response.data.id,
        selectedServices: response.data._embedded.services
      })
      console.log(response.data._embedded.services)
    })
  }
  deleteOrg = (id) => {
    axios.delete(`/organizations/${id}`)
    .then(response => {
      const organizationIndex = this.state.organizations.findIndex(x => x.id === id)
      const organizations = update(this.state.organizations, { $splice: [[organizationIndex, 1]]})
      this.setState({
        organizations: organizations,
        selectedOrgName: organizations[0].name,
        selectedOrgAddress: organizations[0].address,
        selectedOrgDescription: organizations[0].description,
        selectedOrgID: organizations[0].id,
      })
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
                <button className="btn btn-outline-light" onClick={this.addNewOrg}>Add Organization</button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 tabs">
            {this.state.organizations.map((organization) => {
              return (
                <div>
                  <button className="btn-list" onClick={() => this.getOrg(organization.id)} key={organization.id}>
                    <h5 className="btn-title">{organization.name}</h5>
                    <p className="btn-address">{organization.address}</p>
                  </button>
                </div>
              )
            })}
          </div>
          <div className="col-sm-8">
            <div className="row">
              <div className="col-sm-7 text-left">
                <p className="title-text">{this.state.selectedOrgName}</p>
                <p>{this.state.selectedOrgAddress}</p>
                <p>{this.state.selectedOrgDescription}</p>
                <br></br>
                <p>Services Provided</p>
                {this.state.selectedServices.map((service) => {
                  return (
                    <div>
                      <p className="badge badge-primary service">{service.name}</p>
                    </div>
                  )
                })}
              </div>
              <div className="col-sm-1">
                <button className="btn btn-outline-danger" onClick={() => this.deleteOrg(this.state.selectedOrgID)}>Delete Organization</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrganizationsContainer
