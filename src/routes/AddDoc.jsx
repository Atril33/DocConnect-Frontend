import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import getSpecializations from '../redux/specializations/specializationAction';
import { selectSpecializations } from '../redux/store';
import Input from '../components/Input';
import Button from '../components/Button';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import 'react-clock/dist/Clock.css';
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import axios from '../axios';

const AddDoc = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { specializations } = useSelector(selectSpecializations);
  const [timeRange, onChange] = useState(['9:00', '18:00']);
  const MAX_FILE_SIZE = 102400; // 100KB

  const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

  function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    bio: Yup.string()
      .optional(),
    fee_per_appointment: Yup.number()
      .typeError('Must be a number')
      .required('Fee is required'),
    specialization: Yup.number()
      .typeError('Must select a specialization')
      .min(1, 'Please, select a specialization')
      .required('A specialization is mandatory'),
    photo: Yup
      .mixed()
      .required('Required')
      .test('is-valid-type', 'Not a valid image type',
        (value) => isValidFileType(value[0] && value[0].name.toLowerCase(), 'image'))
      .test('is-valid-size', 'Max allowed size is 100KB',
        (value) => value[0] && value[0].size <= MAX_FILE_SIZE),

  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    if (specializations.length === 0) {
      dispatch(getSpecializations());
    }
  }, [dispatch, specializations]);

  const addDoctor = async (data) => {
    const formData = new FormData();
    const doctor = {
      ...data,
      photo: data.photo[0],
      time_available_from: `2000-01-01T${timeRange[0]}:00.000Z`,
      time_available_to: `2000-01-01T${timeRange[1]}:00.000Z`,
    };
    formData.append('doctor[name]', doctor.name);
    formData.append('doctor[bio]', doctor.bio);
    formData.append('doctor[fee_per_appointment]', doctor.fee_per_appointment);
    formData.append('specialization_id', doctor.specialization);
    formData.append('doctor[photo]', doctor.photo);
    formData.append('doctor[time_available_to]', doctor.time_available_to);
    formData.append('doctor[time_available_from]', doctor.time_available_from);

    await toast.promise(axios.post('/api/v1/doctors', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
      },
    }).then(() => {
      navigate('/doctors');
    }),
    {
      pending: 'Creating...',
      error: 'Something went wrong!',
      success: 'Success!',
    });
  };

  return (
    <div className="flex-1 h-screen px-8 py-32">
      <h1 className="text-center mb-6 text-2xl font-bold">Adding a Doctor</h1>
      <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(addDoctor)}>
        <div className="mb-4">
          <Input register={register} name="name" placeholder="Name" type="text" />
          <div className="text-green-700 text-xs">
            {errors.name?.message}
          </div>
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="photo" className="text-sm">Photo:</label>
          <input type="file" id="photo" {...register('photo')} />
          <div className="text-green-700 text-xs">
            {errors.photo?.message}
          </div>
        </div>
        <div className="mb-4">
          <Textarea register={register} name="bio" placeholder="Biography" />
          <div className="text-green-700 text-xs">
            {errors.bio?.message}
          </div>
        </div>
        <div className="mb-4">
          <Input register={register} name="fee_per_appointment" placeholder="Fee" type="decimal" />
          <div className="text-green-700 text-xs">
            {errors.fee_per_appointment?.message}
          </div>
        </div>
        <div className="mb-4">
          <Select
            label="Select a specialization"
            register={register}
            name="specialization"
            options={specializations.map((specialization) => ({
              value: specialization.id,
              text: specialization.name,
            }))}
          />
          <div className="text-green-700 text-xs">
            {errors.specialization?.message}
          </div>
        </div>
        <div className="mb-6">
          <p className="text-sm">Time available to - from</p>
          <TimeRangePicker onChange={onChange} value={timeRange} />
        </div>
        <div>
          <Button className="w-full" text="Create Doctor" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddDoc;
