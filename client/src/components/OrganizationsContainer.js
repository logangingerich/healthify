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
      serviceName: "",
    }
  }
  //Once mounted, GET request to set organizations, initial selected org info
  //and another GET request to
  componentDidMount() {
    let orgLength = ''
    axios.get('/organizations.json')
    .then(response => {
      this.setState({
        organizations: response.data,
        selectedOrgName: response.data[0].name,
        selectedOrgAddress: response.data[0].address,
        selectedOrgDescription: response.data[0].description,
        selectedOrgID: response.data[0].id,
      })
    })
    .catch(error => console.log(error))
    axios.get(`/organizations/1`)
    .then(response => {
      this.setState({
        selectedServices: response.data._embedded.services
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
        selectedOrgDescription: response.data.description,
        selectedOrgID: response.data.id,
        selectedServices: response.data._embedded.services
      })
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
  addNewService = () => {
    axios.post(
      `/organizations/${this.state.selectedOrgID}/services`,
      {service: {name: this.state.serviceName}}
    )
    .then(response => {
      const services = update(this.state.selectedServices, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({
        selectedServices: services,
        serviceName: ""
      })
    })
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div>
        <div className="form">
          <div className="row">
            <div className="col-sm-8">
              <form onSubmit={this.handleSubmit}>
                <p className="text-left input-header">Organization Name*</p>
                <input className='form-control form-input' type="text"
                  name="name" value={this.state.name} onChange={this.handleInput} />
                <p className="text-left input-header">Organization Address*</p>
                <textarea className='form-control form-input' name="address"
                  value={this.state.address} onChange={this.handleInput}></textarea>
              </form>
            </div>
            <div className="col-sm-4">
              <form>
                <p className="text-left input-header">Organization Description</p>
                <textarea className='form-control form-input' name="description"
                  value={this.state.description} onChange={this.handleInput}></textarea>
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
                <input className='form-control service-input' type="text" name="serviceName"
                placeholder="Enter New Service Name" value={this.state.serviceName}
                onChange={this.handleInput} />
                <button onClick={this.addNewService} className="btn btn-outline-primary">Add New Service</button>
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
