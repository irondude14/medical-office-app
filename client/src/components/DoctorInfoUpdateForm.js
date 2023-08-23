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
    <div className='wrapper-general'>
      <form onSubmit={updateDoctorInfo}>
        <h1>Edit Doctor</h1>
        {errorsList ? <ul className='error-list'>{errorsList}</ul> : null}
        <div className='input-box'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={updateInfo.name}
            required
            onChange={handleDoctorInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={updateInfo.email}
            required
            onChange={handleDoctorInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='specialization'
            placeholder='Specialization'
            value={updateInfo.specialization}
            required
            onChange={handleDoctorInfo}
          />
        </div>
        <div className='input-box'>
          <input
            type='text'
            name='phone'
            placeholder='Phone #'
            value={updateInfo.phone}
            required
            onChange={handleDoctorInfo}
          />
        </div>
        <input type='submit' value='Edit' id='submitBtn' className='btn' />
      </form>
    </div>
  );
}

export default DoctorInfoUpdateForm;
