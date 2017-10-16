require "rails_helper"

RSpec.describe "Services API", type: :request do
  def valid_organization_attrs
    {
      name: "Salvation Army",
      address: "151 W 26th St, New York, NY 10001",
      description: "Blood and Fire",
    }
  end

  def valid_service_attrs
    { name: "Free Clothes" }
  end

  describe "GET /organizations/:organization_id/services" do
    context "when the parent organization can not be found" do
      it "returns status code 404" do
        get "/organizations/0/services"

        expect(response).to have_http_status(404)
      end

      it "returns an organization not found message" do
        get "/organizations/0/services"

        expect(response.body).to match(/Couldn't find Organization/)
      end
    end

    context "when the parent organization can be found" do
      it "returns services" do
        organization = Organization.create!(valid_organization_attrs)
        5.times { |i| organization.services.create!(valid_service_attrs) }

        get "/organizations/#{organization.id}/services"

        expect(parsed_response).not_to be_empty
        expect(parsed_response.size).to eq(5)
      end

      it "returns status code 200" do
        organization = Organization.create!(valid_organization_attrs)
        5.times { |i| organization.services.create!(valid_service_attrs) }

        get "/organizations/#{organization.id}/services"

        expect(response).to have_http_status(200)
      end
    end
  end

  describe "POST /organizations/:organization_id/services" do
    context "when the parent organization can not be found" do
      it "returns status code 404" do
        post "/organizations/0/services"

        expect(response).to have_http_status(404)
      end

      it "returns an organization not found message" do
        post "/organizations/0/services"

        expect(response.body).to match(/Couldn't find Organization/)
      end
    end

    context "when the parent organization can be found" do
      context "when the request is valid" do
        it "creates a service" do
          organization = Organization.create!(valid_organization_attrs)
          post "/organizations/#{organization.id}/services", params: { service: valid_service_attrs }

          expect(parsed_response["name"]).to eq("Free Clothes")
        end

        it "returns status code 201" do
          organization = Organization.create!(valid_organization_attrs)
          post "/organizations/#{organization.id}/services", params: { service: valid_service_attrs }

          expect(response).to have_http_status(201)
        end
      end

      context "when the request is invalid" do
        def invalid_service_attrs
          valid_service_attrs.tap { |p| p[:name] = "" }
        end

        it "returns status code 422" do
          organization = Organization.create!(valid_organization_attrs)
          post "/organizations/#{organization.id}/services", params: { service: invalid_service_attrs }

          expect(response).to have_http_status(422)
        end

        it "returns a validation failure message" do
          organization = Organization.create!(valid_organization_attrs)
          post "/organizations/#{organization.id}/services", params: { service: invalid_service_attrs }

          expect(response.body)
            .to match(/Name can't be blank/)
        end
      end
    end
  end
end
