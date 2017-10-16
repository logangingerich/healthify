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
      it "returns the organization" do
        organization = Organization.create(valid_organization_attrs)

        get "/organizations/#{organization.id}"

        expect(parsed_response).not_to be_empty
        expect(parsed_response["id"]).to eq(organization.id)
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
        valid_organization_attrs.tap { |p| p[:name] = "" }
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
end
