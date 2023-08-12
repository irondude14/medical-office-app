import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateDoctor } from '../features/users/DoctorsSlice';

function DoctorInfoUpdateForm() {
  const [errorsList, setErrorsList] = useState(null);
  const [updateInfo, setUpdateInfo] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
  });

  const { doctorID } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doctor = useSelector((state) =>
    state.doctors.value.find((p) => p.id === parseInt(doctorID, 10))
  );
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    setUpdateInfo(doctor || {});
  }, [doctor]);

  useEffect(() => {
    if (!user && user.type !== 'Admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  function handleDoctorInfo(e) {
    setUpdateInfo({
      ...updateInfo,
      [e.target.name]: e.target.value,
    });
  }

  function updateDoctorInfo(e) {
    e.preventDefault();
    fetch(`/doctors/${doctorID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateInfo),
    })
      .then((r) => r.json())
      .then((updatedDoctorInfo) => {
        if (!updatedDoctorInfo.errors) {
          dispatch(updateDoctor(updatedDoctorInfo));
          navigate('/admin-dashboard');
        } else {
          setUpdateInfo({});
          const currentErrors = updatedDoctorInfo.errors.map((e, index) => (
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
      <form onSubmit={updateDoctorInfo}>
        <h3>Edit Doctor's Info: </h3>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          value={updateInfo.name}
          required
          onChange={handleDoctorInfo}
        />
        <br />
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          name='email'
          value={updateInfo.email}
          required
          onChange={handleDoctorInfo}
        />
        <br />
        <label htmlFor='specialization'>
          Specialization:
          <input
            type='text'
            name='specialization'
            value={updateInfo.specialization}
            required
            onChange={handleDoctorInfo}
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
            onChange={handleDoctorInfo}
          />
        </label>
        <br />
        <input type='submit' value='Edit' id='submitBtn' />
      </form>
      {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
    </div>
  );
}

export default DoctorInfoUpdateForm;
