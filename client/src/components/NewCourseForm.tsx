import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type FieldValues } from 'react-hook-form';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { z } from 'zod';

const courseSchema = z.object({
  name: z.string().nonempty("Name is required"),
  departureAddress: z.string().nonempty("Address is required"),
  departureCity: z.string().min(1, "City is required").refine(value => isNaN(Number(value)), {
    message: "City must be a string, not a number"
  }),
  departureZip: z.string()
    .min(5, "Zipcode must be at least 5 characters")
    .max(10, "Zipcode cannot be more than 10 characters")
    .regex(/^\d{5}(-\d{4})?$/, "Invalid US zipcode format"),
  departureDateTime: z.string().nonempty("Departure date and time is required"),
  destinationAddress: z.string().nonempty("Address is required"),
  destinationCity: z.string().min(1, "City is required").refine(value => isNaN(Number(value)), {
    message: "City must be a string, not a number"
  }),
  destinationZip: z.string()
    .min(5, "Zipcode must be at least 5 characters")
    .max(10, "Zipcode cannot be more than 10 characters")
    .regex(/^\d{5}(-\d{4})?$/, "Invalid US zipcode format"),
  destinationDateTime: z.string().nonempty("Arrival date and time is required"),
});

type TCourseSchema = z.infer<typeof courseSchema>;

export default function NewCourseForm() {
  const {user} = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset, 
  } = useForm<TCourseSchema>({
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
          headers: { Authorization: `Bearer ${user?.token}` },
      });
      console.log(response.data);
    } catch (error) {

    }
    console.log("submitted", formattedData);
    reset();
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
