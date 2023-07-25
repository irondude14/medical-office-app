class AdminsController < ApplicationController
  load_and_authorize_resource :user, parent: false

  def index_doctors
    @doctors = User.where(type: 'doctor')
    render json: @doctors
  end
end
