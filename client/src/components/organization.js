import React from 'react'

const Organization = ({organization}) =>
  <div className="tile" key={organization.id}>
    <h4>{organization.name}</h4>
    <p>{organization.address}</p>
  </div>

export default Organization
