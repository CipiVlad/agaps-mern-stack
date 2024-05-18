import { Request, Response } from 'express';
import User from '../../models/User';

// save new course
export const saveCourse = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const newCourse = req.body;

    // Validate newCourse structure here if necessary
    if (!newCourse || !newCourse.courseInfo) {
        return res.status(400).json({ error: 'Invalid course data' });
    }

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the new course to the savedCourses array
        user.savedCourses.push(newCourse);

        // Save the updated user document
        await user.save();

        // Respond with the updated user
        res.status(200).json(user);
    } catch (error) {
        console.error('Error saving new course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
