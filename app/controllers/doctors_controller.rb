class DoctorsController < ApplicationController
  load_and_authorize_resource
  before_action :load_doctor, only: [:destroy]

  def destroy
    @user.destroy
    render json: { message: 'User account deleted successfully' }, status: :ok
  end

  private

  def load_doctor
    @user = User.find(params[:id])
  end
end
