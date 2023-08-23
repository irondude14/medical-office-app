import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTestResult } from '../features/users/UsersSlice';

function TestResultUpdateForm() {
  const { testResultID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const testResult = user.test_results.find(
    (t) => t.id === parseInt(testResultID)
  );

  const [updateTestInfo, setUpdatedTestInfo] = useState({
    result: testResult.result,
  });
  const [errorsList, setErrorsList] = useState(null);

  function handleInputChange(e) {
    setUpdatedTestInfo({
      ...updateTestInfo,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (!user || user.type !== 'Doctor') {
      navigate('/profile');
    }
  }, [user, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/test_results/${testResult.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateTestInfo),
    })
      .then((r) => r.json())
      .then((test) => {
        if (!test.errors) {
          dispatch(updateTestResult(test));
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
        <h1>Updating Results for: {testResult.test_name}</h1>
        {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
        <div className='input-box'>
          <input
            type='text'
            name='result'
            value={updateTestInfo.result}
            placeholder='Result of the test'
            onChange={handleInputChange}
          />
        </div>
        <input type='submit' value='Update' id='submitBtn' className='btn' />
      </form>
    </div>
  );
}

export default TestResultUpdateForm;
