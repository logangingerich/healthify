class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :respond_not_found

  def respond_not_found(exception)
    render json: exception.message, status: :not_found
  end
end
