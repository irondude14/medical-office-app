import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updatePatient } from '../features/users/PatientsSlice';

function PatientInfoUpdateForm() {
  const { patientID } = useParams();

  const [errorsList, setErrorsList] = useState(null);
  const [updateInfo, setUpdateInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    insurance: '',
  });

  const patient = useSelector((state) =>
    state.patients.value.find((p) => p.id === parseInt(patientID, 10))
  );
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUpdateInfo(patient || {});
  }, [patient]);

  useEffect(() => {
    if (!user && user.type !== 'Admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  function handlePatientInfo(e) {
    setUpdateInfo({
      ...updateInfo,
      [e.target.name]: e.target.value,
    });
  }

  function updatePatientInfo(e) {
    e.preventDefault();
    fetch(`/patients/${patientID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateInfo),
    })
      .then((r) => r.json())
      .then((updatedPatientInfo) => {
        if (!updatedPatientInfo.errors) {
          dispatch(updatePatient(updatedPatientInfo));
          navigate('/admin-dashboard');
        } else {
          setUpdateInfo({});
          const currentErrors = updatedPatientInfo.errors.map((e, index) => (
            <li key={index}>{e}</li>
          ));
          setErrorsList(currentErrors);
        }
      });
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={updatePatientInfo}>
        <h3>Edit Patient's Info: </h3>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          value={updateInfo.name}
          required
          onChange={handlePatientInfo}
        />
        <br />
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          name='email'
          value={updateInfo.email}
          required
          onChange={handlePatientInfo}
        />
        <br />
        <label htmlFor='address'>
          Address:
          <input
            type='text'
            name='address'
            value={updateInfo.address}
            required
            onChange={handlePatientInfo}
          />
        </label>
        <br />
        <label htmlFor='phone'>
          Phone #:
          <input
            type='text'
            name='phone'
            value={updateInfo.phone}
            required
            onChange={handlePatientInfo}
          />
        </label>
        <br />
        <label htmlFor='insurance'>
          Insurance:
          <input
            type='text'
            name='insurance'
            value={updateInfo.insurance}
            required
            onChange={handlePatientInfo}
          />
        </label>
        <br />
        <input type='submit' value='Edit' id='submitBtn' />
      </form>
      {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
    </div>
  );
}

export default PatientInfoUpdateForm;
