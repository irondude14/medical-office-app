class UsersController < ApplicationController
  load_and_authorize_resource

  def show
    render json: current_user
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
end
