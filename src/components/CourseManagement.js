import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getCourses, getCourseById, createCourse, updateCourse, deleteCourseById } from '../services/courseService'; // Adjust the path as needed

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [courseData, setCourseData] = useState({
        title: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await getCourses();
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleDialogOpen = () => {
        setDialogTitle('Add New Course');
        setCourseData({ title: '' });
        setEditMode(false);
        setOpenDialog(true);
    };

    const handleEditCourse = async (id) => {
        try {
            const response = await getCourseById(id);
            const { id: courseId, title } = response.data;
            setCourseData({ id: courseId, title });
            setDialogTitle('Update Course');
            setEditMode(true);
            setSelectedCourseId(courseId);
            setOpenDialog(true);
        } catch (error) {
            console.error('Error fetching course for editing:', error);
        }
    };

    const handleDeleteCourse = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await deleteCourseById(id);
                fetchCourses();
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

    const handleSaveCourse = async () => {
        try {
            if (editMode) {
                await updateCourse(selectedCourseId, courseData);
            } else {
                await createCourse(courseData);
            }
            setOpenDialog(false);
            fetchCourses();
        } catch (error) {
            console.error('Error saving course:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevCourseData) => ({
            ...prevCourseData,
            [name]: value,
        }));
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                Add New Course
            </Button>

            <TableContainer component={Paper}>
                <Table aria-label="courses table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell>{course.id}</TableCell>
                                <TableCell>{course.title}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleEditCourse(course.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDeleteCourse(course.id)}
                                        style={{ marginLeft: '1rem' }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        name="title"
                        fullWidth
                        value={courseData.title}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveCourse} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CourseManagement;
