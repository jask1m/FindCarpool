import { Request, Response } from 'express';
import Course from './courseSchema';

// createCourse controller function to create a new course
const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    if (!req.user?._id) {
      res.status(401).json({ message: "Unauthorized. User not authenticated." });
      return;
    }
    const course = new Course({
      name: body.name,
      user: req.user._id,
      departureAddress: body.departureAddress,
      departureCity: body.departureCity,
      departureZip: body.departureZip,
      departureDateTime: body.departureDateTime,
      destinationAddress: body.destinationAddress,
      destinationCity: body.destinationCity,
      destinationZip: body.destinationZip,
      destinationDateTime: body.destinationDateTime
    });

    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    if (error instanceof Error) {
      // Check if it's a validation error
      res.status(400).json({ message: error.message });
    } else {
      // Handle internal server error
      console.error("Internal server error: ", error);
      res.status(500).json({ message: "Internal server error. Course not created." });
    }
  }
}

export { createCourse };