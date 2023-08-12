class DoctorsController < ApplicationController
  load_and_authorize_resource
  before_action :load_doctor, only: %i[update destroy]

  def update
    if @user.update(doctor_update_params)
      render json: @user
    else
      render json: {
               errors: @user.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    render json: { message: 'User account deleted successfully' }, status: :ok
  end

  private

  def load_doctor
    @user = User.find(params[:id])
  end

  def doctor_update_params
    params.require(:doctor).permit(:name, :email, :phone, :specialization)
  end
end
