class AdminsController < ApplicationController
  load_and_authorize_resource except: :create

  def create
    user = User.new(user_params)
    authorize! :create, user
    if user.save
      render json: user, status: :created
    else
      render json: {
               errors: user.errors.full_messages,
             },
             status: :unprocessable_entity
    end
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
