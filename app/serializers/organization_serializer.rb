require "oat/adapters/hal"

class OrganizationSerializer < Oat::Serializer
  adapter Oat::Adapters::HAL

  schema do
    map_properties :id, :name, :address
    entities :services, item.services do |service, service_serializer|
      service_serializer.map_properties :id, :name, :address
    end
  end
end
