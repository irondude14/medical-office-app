import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DashboardDoctor() {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.type !== 'Doctor') {
      navigate('/profile');
    }
  }, [user, navigate]);

  const patientList =
    user.patients &&
    user.patients.map((patient) => (
      <div key={patient.id} className='card'>
        <li>
          <div
            onClick={() => {
              if (selectedPatientId === patient.id) {
                setSelectedPatientId(null);
              } else {
                setSelectedPatientId(patient.id);
              }
            }}
          >
            <h3>{patient.name}</h3>
            <p>Phone #: {patient.phone}</p>
            <p>Email: {patient.email}</p>
          </div>

          {selectedPatientId === patient.id ? (
            <>
              <h4>Upcoming appointments</h4>
              {user.appointments && user.appointments.length > 0 ? (
                user.appointments
                  .filter(
                    (appointment) =>
                      appointment.patient_id === selectedPatientId
                  )
                  .map((appointment) => {
                    const appointmentDate = new Date(appointment.date_time);
                    const formattedDate = appointmentDate.toLocaleDateString();
                    const formattedTime = appointmentDate.toLocaleTimeString();
                    return (
                      <div key={appointment.id} className='appointment-card'>
                        <p>Appointment Date: {formattedDate}</p>
                        <p>Appointment Time: {formattedTime}</p>
                        <p>Reason: {appointment.reason}</p>
                      </div>
                    );
                  })
              ) : (
                <p>No upcoming appointments.</p>
              )}
              <h4>Test Results</h4>
              {user.test_results && user.test_results.length > 0 ? (
                user.test_results
                  .filter(
                    (testResult) => testResult.patient_id === selectedPatientId
                  )
                  .map((testResult) => (
                    <div key={testResult.id} className='test-result-card'>
                      <p>Test Name: {testResult.test_name}</p>
                      <p>Result: {testResult.result}</p>
                      <button>
                        <Link to={`/test-result-edit/${testResult.id}`}>
                          Edit
                        </Link>
                      </button>
                    </div>
                  ))
              ) : (
                <p>No test results available.</p>
              )}
              <br />
              <button>
                <Link to={`/new-test/${patient.id}`}>New Test</Link>
              </button>
            </>
          ) : null}
        </li>
      </div>
    ));
  return (
    <div className='wrapper-dashboard'>
      <div className='card-container'>
        <ul>
          <h3>Patients:</h3>
          {patientList}
        </ul>
      </div>
    </div>
  );
}

export default DashboardDoctor;
