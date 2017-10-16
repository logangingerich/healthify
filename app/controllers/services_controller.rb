class ServicesController < ApplicationController
  def index
    @services = Organization.find(params[:organization_id]).services
    render json: @services, status: :ok
  end

  def create
    @service = Organization.find(params[:organization_id]).services.new(service_params)

    if @service.save
      render json: @service, status: :created
    else
      render json: { message: @service.errors.full_messages }, status: 422
    end
  end

  private

  def service_params
    params.require(:service).permit(:name)
  end
end
