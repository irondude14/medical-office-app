class AdminsController < ApplicationController
  load_and_authorize_resource :user

  def index
    @doctors = User.where(type: 'doctor')
    render json: @doctors
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: :created
    else
      render json: {
               errors: user.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    render json: { message: 'User account deleted successfully' }, status: :ok
  end

  private

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :type,
      :password,
      :password_confirmation,
      :specialization,
      :phone,
    )
  end
end
