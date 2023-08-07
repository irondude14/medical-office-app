import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CreateNewPatientForm() {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    insurance: '',
  });

  const [errorsList, setErrorsList] = useState(null);
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
          navigate('/dashboardAdmin');
        } else {
          setPatientInfo({
            name: '',
            email: '',
            phone: '',
            address: '',
            insurance: '',
          });
          const currentErrors = patient.errors.map((e, index) => (
            <li key={index}>{e}</li>
          ));
          setErrorsList(currentErrors);
        }
      });
  }

  console.log(patientInfo);

  return (
    <div>
      <form onSubmit={createPatient}>
        <h3>Create User Account: </h3>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          value={patientInfo.name}
          required
          onChange={handlePatientInfo}
        />
        <br />
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          name='email'
          value={patientInfo.email}
          required
          onChange={handlePatientInfo}
        />
        <br />
        <label htmlFor='address'>
          Address:
          <input
            type='text'
            name='address'
            value={patientInfo.address}
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
            value={patientInfo.phone}
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
            value={patientInfo.insurance}
            required
            onChange={handlePatientInfo}
          />
        </label>
        <br />
        <input type='submit' value='Register' id='submitBtn' />
      </form>
      {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
    </div>
  );
}

export default CreateNewPatientForm;
