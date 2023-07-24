class ApplicationController < ActionController::API
  include ActionController::Cookies
  include CanCan::ControllerAdditions

  rescue_from CanCan::AccessDenied do |exception|
    render json: { error: 'Access denied.' }, status: :forbidden
  end

  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end
end
