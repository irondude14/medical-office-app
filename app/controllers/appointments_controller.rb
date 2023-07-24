class AppointmentsController < ApplicationController
  load_and_authorize_resource

  def index
    appointments = Appointment.all
    redner json: appointments
  end

  def create
    appointment = current_user.appointment.create(appointment_params)
    if appointment.valid?
      render json: appointment, status: :created
    else
      render json: {
               errors: appointment.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def update
    # appointment = current_user
  end

  def destroy
  end

  private

  def appointment_params
    params.require(:appointment).permit(:patient_id, :name, :date_time, :reason)
  end
end
