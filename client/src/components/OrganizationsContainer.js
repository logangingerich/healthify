import React, { Component } from 'react'
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
      selectedOrgID: ""
    }
  }
  //Once mounted, GET request to set organizations, initial selected organization info
  //and another GET request to retrieve services for displayed organization
  componentDidMount() {
    axios.get('/organizations')
    .then(response => {
      this.setState({
        organizations: response.data,
        selectedOrgName: response.data[0].name,
        selectedOrgAddress: response.data[0].address,
        selectedOrgDescription: response.data[0].description,
        selectedOrgID: response.data[0].id,
      })
      axios.get(`/organizations/${this.state.selectedOrgID}`)
      .then(response => {
        this.setState({
          selectedServices: response.data._embedded.services
        })
      })
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  }
  //GET request to retrieve info on specific organization based on ID
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
  //DELETE request and organizations update
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
  //POST request for new organization and organizations update
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
  //POST request for creating new service and a service list update
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
      {/*FORM FOR ORGANZATION CREATION*/}
        <div className="form">
          <div className="row">
            <div className="col-sm-8">
              <form>
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
                <button className="btn btn-outline-light test" onClick={this.addNewOrg}>Add Organization</button>
              </form>
            </div>
          </div>
        </div>
        {/*LEFT SIDEBAR DISPLAYING ALL ORGANIZATIONS*/}
        {this.state.organizations.length !== 0 ?
        <div className="row">
          <div className="col-sm-4 tabs">
            {this.state.organizations.map((organization) => {
              return (
                <div key={organization.id}>
                  <button className="btn-list" onClick={() => this.getOrg(organization.id)}>
                    <h5 className="btn-title">{organization.name}</h5>
                    <p className="btn-address">{organization.address}</p>
                  </button>
                </div>
              )
            })}
          </div>
          {/*BOTTOM RIGHT SHOW VIEW OF SELECTED ORGANIZATION*/}
          <div className="col-sm-8">
            <div className="row shown-org">
              <div className="col-sm-7 text-left">
                <p className="title-text">{this.state.selectedOrgName}</p>
                <p>{this.state.selectedOrgAddress}</p>
                <p>{this.state.selectedOrgDescription}</p>
                <br></br>
                <p>Services Provided</p>
                {this.state.selectedServices.map((service) => {
                  return (
                    <div key={service.id}>
                      <p className="badge badge-primary service">{service.name}</p>
                    </div>
                  )
                })}
                {/*INPUT FORM FOR NEW SERVICE FOR CORRESPONSING ORGANIZATION*/}
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
        </div> :
        <h5>No Organizations! Try Adding Some Above</h5>
      }
      </div>
    );
  }
}

export default OrganizationsContainer
