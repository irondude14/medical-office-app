class PatientsController < ApplicationController
  load_and_authorize_resource

  def index
    patients = Patient.all
    redner json: patients
  end

  def show
    render json: @patient
  end

  def create
    patient = Patient.create(patient_params)
    if patient.valid?
      render json: patient, status: :created
    else
      render json: {
               errors: patient.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def update
    if @patient.update(patient_update_params)
      render json: @patient
    else
      render json: {
               errors: @patient.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    @patient.destroy
    render json: { message: 'Patient deleted' }, status: :ok
  end

  private

  def patient_params
    params.require(:patient).permit(:email, :name, :address, :phone, :insurance)
  end

  def patient_update_params
    params.require(:patient).permit(:email, :name, :address, :phone, :insurance)
  end
end
