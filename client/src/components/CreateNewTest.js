import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addTestResult } from '../features/users/UsersSlice';

function CreateNewTest() {
  const { patientID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  const [testInfo, setTestInfo] = useState({
    patient_id: parseInt(patientID),
    test_name: '',
    result: '',
  });
  const [errorsList, setErrorsList] = useState(null);

  function handleInputChange(e) {
    setTestInfo({
      ...testInfo,
      [e.target.name]: e.target.value,
    });
  }

  const patient = user.patients.find((p) => p.id === parseInt(patientID));

  useEffect(() => {
    if (!user || user.type !== 'Doctor') {
      navigate('/profile');
    }
  }, [user, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/test_results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testInfo),
    })
      .then((r) => r.json())
      .then((test) => {
        if (!test.errors) {
          dispatch(addTestResult(test));
          navigate('/doctor-dashboard');
        } else {
          const currentErrors = test.errors.map((e, index) => (
            <li key={index}>{e}</li>
          ));
          setErrorsList(currentErrors);
        }
      })
      .catch((error) => console.log('Error: ', error.message));
  }

  return (
    <div className='wrapper-general'>
      <form onSubmit={handleSubmit}>
        <h1>New Test for {patient.name}</h1>
        {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
        <div className='input-box'>
          <input
            type='text'
            name='test_name'
            value={testInfo.test_name}
            placeholder='Name of the Test'
            onChange={handleInputChange}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='result'
            value={testInfo.result}
            placeholder='Result of the test'
            onChange={handleInputChange}
          />
        </div>
        <input type='submit' value='Create' id='submitBtn' className='btn' />
      </form>
    </div>
  );
}

export default CreateNewTest;
