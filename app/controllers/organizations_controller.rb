class OrganizationsController < ApplicationController
  def index
    organizations = Organization.all
    render json: organizations, status: :ok
  end

  def show
    organization = Organization.find(params[:id])
    render json: OrganizationSerializer.new(organization), status: :ok
  end


  def create
    organization = Organization.new(organization_params)
    if organization.save
      render json: organization, status: :created
    else
      render json: { message: organization.errors.full_messages }, status: 422
    end
  end

  def destroy
    organization = Organization.find(params[:id])
    if organization.destroy
      head :no_content, status: :ok
    else
      render json: { message: organization.errors.full_messages }, status: 422
    end
  end

  private

  def organization_params
    params.require(:organization).permit(:name, :address, :description)
  end
end
