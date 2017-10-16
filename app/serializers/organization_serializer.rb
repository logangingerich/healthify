require "oat/adapters/hal"

class OrganizationSerializer < Oat::Serializer
  adapter Oat::Adapters::HAL

  schema do
    map_properties :id, :name
    entities :services, item.services do |service, service_serializer|
      service_serializer.map_properties :id, :name
    end
  end
end
