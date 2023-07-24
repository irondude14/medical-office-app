class ApplicationController < ActionController::API
  include ActionController::Cookies

  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
    unless @current_user
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end
end
