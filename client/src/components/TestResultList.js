import React from 'react';
import { Link } from 'react-router-dom';

function TestResultList({ patientId, testResults }) {
  const patientTestResults = testResults.filter(
    (testResult) => testResult.patient_id === patientId
  );

  return (
    <>
      <h4>Test Results</h4>
      {patientTestResults.length > 0 ? (
        patientTestResults.map((testResult) => (
          <div key={testResult.id} className='test-result-card'>
            <p>Test Name: {testResult.test_name}</p>
            <p>Result: {testResult.result}</p>
            <button className=''>
              <Link to={`/test-result-edit/${testResult.id}`}>Edit</Link>
            </button>
          </div>
        ))
      ) : (
        <p>No tests scheduled.</p>
      )}
    </>
  );
}

export default TestResultList;
