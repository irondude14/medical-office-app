import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addPatient } from '../features/users/PatientsSlice';

function CreateNewPatientForm() {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    insurance: '',
  });

  const [errorsList, setErrorsList] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (!user || user.type !== 'Admin') {
      navigate('/profile');
    }
  }, [user, navigate]);

  function handlePatientInfo(e) {
    setPatientInfo({
      ...patientInfo,
      [e.target.name]: e.target.value,
    });
  }

  function createPatient(e) {
    e.preventDefault();
    const patient = { patient: patientInfo };
    fetch('/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    })
      .then((r) => r.json())
      .then((patient) => {
        if (!patient.errors) {
          dispatch(addPatient(patient));
          navigate('/admin-dashboard');
        } else {
          const currentErrors = patient.errors.map((e, index) => (
            <li key={index}>{e}</li>
          ));
          setErrorsList(currentErrors);
        }
      });
  }

  console.log(patientInfo);

  return (
    <div className='wrapper-general'>
      <form onSubmit={createPatient}>
        <h1>New Patient</h1>
        {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
        <div className='input-box'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={patientInfo.name}
            required
            onChange={handlePatientInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={patientInfo.email}
            required
            onChange={handlePatientInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='address'
            placeholder='Address'
            value={patientInfo.address}
            required
            onChange={handlePatientInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='phone'
            placeholder='Phone #'
            value={patientInfo.phone}
            required
            onChange={handlePatientInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='insurance'
            placeholder='Insurance Name'
            value={patientInfo.insurance}
            required
            onChange={handlePatientInfo}
          />
        </div>
        <div className='button-container'>
          <input type='submit' value='CREATE' id='submitBtn' className='btn' />
          <button onClick={() => navigate('/admin-dashboard')} className='btn'>
            BACK
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNewPatientForm;
