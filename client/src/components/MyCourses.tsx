import NewCourseForm from './NewCourseForm'
import { useState } from 'react'

const MyCourses = () => {
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  return (
    <div className='flex flex-col border w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-2/3 mx-auto p-4'>
      <button 
        onClick={() => setIsCreatingCourse(!isCreatingCourse)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        {isCreatingCourse ? 'Cancel' : 'Create New Course'}
      </button>
      <div className="w-full">
        {isCreatingCourse ? (
          <NewCourseForm />
        ) : (
          <p className="text-center">Click the button above to create a new course.</p>
        )}
      </div>
    </div>
  )
}

export default MyCourses
