class AppointmentsController < ApplicationController
  load_and_authorize_resource
  # before_action :set_appointment, only: %i[show update destroy]

  def index
    appointments = Appointment.all
    render json: appointments
  end

  def show
    render json: @appointment
  end

  def create
    appointment = Appointment.create(appointment_params)
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
    if @appointment.update(appointment_update_params)
      render json: @appointment
    else
      render json: {
               errors: @appointment.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    @appointment.destroy
    render json: { message: 'Appointment deleted' }, status: :ok
  end

  private

  # def set_appointment
  #   @appointment = Appointment.find_by(id: params[:id])
  #   unless @appointment
  #     render json: { error: 'Appointment not found' }, status: :not_found
  #   end
  # end

  def appointment_params
    params.require(:appointment).permit(
      :patient_id,
      :user_id,
      :date_time,
      :reason,
    )
  end

  def appointment_update_params
    params.require(:appointment).permit(:user_id, :date_time, :reason)
  end
end
