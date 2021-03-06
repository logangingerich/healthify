require "rails_helper"

RSpec.describe "Organizations API", type: :request do
  def valid_organization_attrs
    {
      name: "Salvation Army",
      address: "151 W 26th St, New York, NY 10001",
      description: "Blood and Fire",
    }
  end

  describe "GET /organizations" do
    it "returns organizations" do
      10.times { Organization.create(valid_organization_attrs) }

      get "/organizations"

      expect(parsed_response).not_to be_empty
      expect(parsed_response.size).to eq(10)
    end

    it "returns status code 200" do
      10.times { Organization.create(valid_organization_attrs) }

      get "/organizations"

      expect(response).to have_http_status(200)
    end
  end

  describe "GET /organizations/:id" do
    context "when the record exists" do
      it "returns the organization and its services" do
        organization = Organization.create(valid_organization_attrs)
        services = (1..3).map { organization.services.create(name: "Free Clothes") }

        get "/organizations/#{organization.id}"

        expect(parsed_response).not_to be_empty
        expect(parsed_response["id"]).to eq(organization.id)

        services_data = parsed_response["_embedded"]["services"]
        expect(services_data).to be_present
        expect(services_data.map { |s| s["id"] }).to match_array(services.map(&:id))
      end

      it "returns status code 200" do
        organization = Organization.create(valid_organization_attrs)

        get "/organizations/#{organization.id}"

        expect(response).to have_http_status(200)
      end
    end

    context "when the record does not exist" do
      it "returns status code 404" do
        get "/organizations/0"

        expect(response).to have_http_status(404)
      end

      it "returns a not found message" do
        get "/organizations/0"

        expect(response.body).to match(/Couldn't find Organization/)
      end
    end
  end

  describe "POST /organizations" do
    context "when the request is valid" do
      it "creates an organization" do
        post "/organizations", params: { organization: valid_organization_attrs }

        expect(parsed_response["name"]).to eq("Salvation Army")
      end

      it "returns status code 201" do
        post "/organizations", params: { organization: valid_organization_attrs }

        expect(response).to have_http_status(201)
      end
    end

    context "when the request is invalid" do
      def invalid_organization_attrs
        {
          name: "",
          address: "151 W 26th St, New York, NY 10001",
          description: "Blood and Fire",
        }
      end

      it "returns status code 422" do
        post "/organizations", params: { organization: invalid_organization_attrs }

        expect(response).to have_http_status(422)
      end

      it "returns a validation failure message" do
        post "/organizations", params: { organization: invalid_organization_attrs }

        expect(response.body)
          .to match(/Name can't be blank/)
      end
    end
  end

  describe 'DELETE /organizations/:id' do
    context "when the record exists" do
      it 'deletes organization' do
        organization = Organization.create(valid_organization_attrs)
        orgID = organization.id

        delete "/organizations/#{organization.id}"
        expect(Organization.where(id: orgID)).to be_empty
      end

      it "returns status code 204" do
        organization = Organization.create(valid_organization_attrs)

        delete "/organizations/#{organization.id}"
        expect(response).to have_http_status(204)
      end
    end

    context "when the record doesn't exist" do
      it "returns status code 404" do
        delete "/organizations/0"

        expect(response).to have_http_status(404)
      end
    end
  end
end
