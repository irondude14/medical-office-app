class SessionsController < ApplicationController
  # login

  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      if user.type == 'Admin'
        doctors = User.where(type: 'Doctor')
        patients = Patient.all

        session[:user_id] = user.id
        render json: {
                 user:
                   ActiveModelSerializers::SerializableResource.new(
                     user,
                   ).as_json,
                 doctors:
                   ActiveModelSerializers::SerializableResource.new(
                     doctors,
                   ).as_json,
                 patients:
                   ActiveModelSerializers::SerializableResource.new(
                     patients,
                   ).as_json,
               }
      else
        session[:user_id] = user.id
        render json: user
      end
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  # logout

  def destroy
    session.clear
    render json: { message: 'Logged out successfully' }, status: :ok
  end
end
