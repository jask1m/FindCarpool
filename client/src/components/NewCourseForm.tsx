import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldValues } from 'react-hook-form';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { courseSchema, TCourseSchema } from '../lib/types';

export default function NewCourseForm() {
  type FormData = TCourseSchema & {
    root?: {
      serverError: {
        type: string;
        message: string;
      };
    };
  }
  const {user} = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset, 
    setError
  } = useForm<FormData>({
    resolver: zodResolver(courseSchema),
  });
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const onSubmit = async (data: FieldValues) => {
    // Convert string dates to Date objects
    const formattedData = {
      ...data,
      departureDateTime: new Date(data.departureDateTime),
      destinationDateTime: new Date(data.destinationDateTime),
      user: user,
    };
    console.log(formattedData);
    try {
      const response = await axios.post(
        `${BASE_URL}/course/create`, formattedData, {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      console.log(response.data);
      reset();
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError("root.serverError", {
          type: "401",
          message: "You must be logged in to create a route."
        });
      } else {
        setError("root.serverError", {
          type: "unknown",
          message: "An error occurred while creating the route."
        });
      }
      console.log("error creating course: ", error);
    }
    console.log("submitted", formattedData);
  }

  return (
    <div className="flex justify-center container mx-auto my-auto w-full items-center">
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4 w-full max-w-md border p-6 bg-white rounded-lg shadow-md'>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Create New Route</h2>
        
        <div>
          <input
            {...register('name')}
            type='text'
            placeholder='Route Name'
            className="w-full py-2 px-4 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
          />
          {errors.name && <p className='text-red-500 text-sm mt-1'>{`${errors.name.message}`}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Departure Location</label>
          <input
            {...register('departureAddress')}
            type='text'
            placeholder='Address'
            className="w-full py-2 px-4 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
          />
          {errors.departureAddress && <p className='text-red-500 text-sm mt-1'>{`${errors.departureAddress.message}`}</p>}
        </div>
        
        <div className="flex gap-x-2">
          <div className="w-1/2">
            <input
              {...register('departureCity')}
              type='text'
              placeholder='City'
              className="w-full py-2 px-4 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
            />
            {errors.departureCity && <p className='text-red-500 text-sm mt-1'>{`${errors.departureCity.message}`}</p>}
          </div>
          <div className="w-1/2">
            <input
              {...register('departureZip')}
              type='text'
              placeholder='Zip Code'
              className="w-full py-2 px-4 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
            />
            {errors.departureZip && <p className='text-red-500 text-sm mt-1'>{`${errors.departureZip.message}`}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Departure Date and Time</label>
          <input
            {...register('departureDateTime')}
            type='datetime-local'
            className="w-full py-2 px-4 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
          />
          {errors.departureDateTime && <p className='text-red-500 text-sm mt-1'>{`${errors.departureDateTime.message}`}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Arrival Location</label>
          <input
            {...register('destinationAddress')}
            type='text'
            placeholder='Address'
            className="w-full py-2 px-4 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
          />
          {errors.destinationAddress && <p className='text-red-500 text-sm mt-1'>{`${errors.destinationAddress.message}`}</p>}
        </div>
        
        <div className="flex gap-x-2">
          <div className="w-1/2">
            <input
              {...register('destinationCity')}
              type='text'
              placeholder='City'
              className="w-full py-2 px-4 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
            />
            {errors.destinationCity && <p className='text-red-500 text-sm mt-1'>{`${errors.destinationCity.message}`}</p>}
          </div>
          <div className="w-1/2">
            <input
              {...register('destinationZip')}
              type='text'
              placeholder='Zip Code'
              className="w-full py-2 px-4 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
            />
            {errors.destinationZip && <p className='text-red-500 text-sm mt-1'>{`${errors.destinationZip.message}`}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Arrival Date and Time</label>
          <input
            {...register('destinationDateTime')}
            type='datetime-local'
            className="w-full py-2 px-4 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
          />
          {errors.destinationDateTime && <p className='text-red-500 text-sm mt-1'>{`${errors.destinationDateTime.message}`}</p>}
        </div>

        {errors.root?.serverError && (
          <p className='text-red-500 text-sm mt-1 text-center'>
            {errors.root.serverError.message}
          </p>
        )}
        
        <button 
          disabled={isSubmitting} 
          type='submit'
          className="py-2 bg-black w-full rounded text-blue-50 font-bold hover:bg-blue-700 disabled:bg-gray-500 transition duration-300"
        >
          {isSubmitting ? 'Creating...' : 'Create Route'}
        </button>
      </form>
    </div>
  );
}
