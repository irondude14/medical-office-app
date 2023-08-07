# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user
    # Admin can do everything
    if user.type == 'Admin'
      can :manage, :all
    elsif user.type == 'Doctor'
      # I'll need to specify premissions for the doctors:
      # Doctor can read their own record
      can :read, User, id: user.id

      # Doctor can update their own record
      can :update, User, id: user.id

      # Doctor can see their own appointments
      can :read, Appointment, user_id: user.id

      # Doctor can see their patients through their appointments
      can :read, Patient, appointments: { user_id: user.id }

      # Doctor can see their patients' test results
      can :read, TestResult, patient: { appointments: { user_id: user.id } }

      # Doctor can create test results for their patients
      can :create, TestResult do |test_result|
        user.appointments.exists?(patient_id: test_result.patient_id)
      end

      # Doctor can update test results for their patients
      can :update, TestResult do |test_result|
        user.appointments.exists?(patient_id: test_result.patient_id)
      end
    end
  end
end
