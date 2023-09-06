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
    <div className='wrapper-general'>
      <form onSubmit={updatePatientInfo}>
        <h1>Edit Patient</h1>
        {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
        <div className='input-box'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={updateInfo.name}
            required
            onChange={handlePatientInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={updateInfo.email}
            required
            onChange={handlePatientInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='address'
            placeholder='Address'
            value={updateInfo.address}
            required
            onChange={handlePatientInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='phone'
            placeholder='Phone #'
            value={updateInfo.phone}
            required
            onChange={handlePatientInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='insurance'
            placeholder='Name of the Insurance'
            value={updateInfo.insurance}
            required
            onChange={handlePatientInfo}
          />
        </div>
        <div className='button-container'>
          <input type='submit' value='EDIT' id='submitBtn' className='btn' />
          <button onClick={() => navigate('/admin-dashboard')} className='btn'>
            BACK
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatientInfoUpdateForm;
