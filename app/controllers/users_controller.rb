class UsersController < ApplicationController
  load_and_authorize_resource

  def show
    render json: current_user
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

  def update
    if current_user.update(user_update_params)
      render json: current_user
    else
      render json: {
               errors: current_user.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  private

  def user_update_params
    params.require(:user).permit(:name, :email, :phone)
  end

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
