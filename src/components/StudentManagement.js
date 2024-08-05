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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudentById,
} from '../services/studentService';
import {
    getCourses
} from '../services/courseService';

const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [studentData, setStudentData] = useState({
        id: null,  // Include ID in state
        name: '',
        attendance: true,
        performance: '',
        courseIds: [],
    });
    const [editMode, setEditMode] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    useEffect(() => {
        fetchStudents();
        fetchCourses();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await getStudents();
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await getCourses();
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleDialogOpen = () => {
        setDialogTitle('Add New Student');
        setStudentData({ id: null, name: '', attendance: true, performance: '', courseIds: [] });
        setEditMode(false);
        setOpenDialog(true);
    };

    const handleEditStudent = async (id) => {
        try {
            const response = await getStudentById(id);
            const { id: studentId, name, attendance, performance, courses } = response.data;
            setStudentData({
                id: studentId,
                name,
                attendance,
                performance,
                courseIds: courses ? courses.map(c => c.id) : []
            });
            setDialogTitle('Update Student');
            setEditMode(true);
            setSelectedStudentId(studentId);
            setOpenDialog(true);
        } catch (error) {
            console.error('Error fetching student for editing:', error);
        }
    };

    const handleDeleteStudent = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await deleteStudentById(id);
                fetchStudents();
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    const handleSaveStudent = async () => {
        try {
            if (editMode) {
                await updateStudent(selectedStudentId, studentData);
            } else {
                await createStudent(studentData);
            }
            setOpenDialog(false);
            fetchStudents();
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prevStudentData) => ({
            ...prevStudentData,
            [name]: value,
        }));
    };

    const handleCourseChange = (e) => {
        const { value } = e.target;
        setStudentData((prevStudentData) => ({
            ...prevStudentData,
            courseIds: value,
        }));
    };

    const handleAttendanceChange = (e) => {
        setStudentData((prevStudentData) => ({
            ...prevStudentData,
            attendance: e.target.checked,
        }));
    };

    const getCourseTitlesByIds = (courseIds) => {
        return courseIds ? courseIds.map(id => {
            const course = courses.find(course => course.id === id);
            return course ? course.title : '';
        }).join(', ') : '';
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                Add New Student
            </Button>

            <TableContainer component={Paper}>
                <Table aria-label="students table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell> {/* New ID column */}
                            <TableCell>Name</TableCell>
                            <TableCell>Attendance</TableCell>
                            <TableCell>Performance</TableCell>
                            <TableCell>Courses</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.id}</TableCell> {/* Display ID */}
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.attendance ? 'Present' : 'Absent'}</TableCell>
                                <TableCell>{student.performance || '-'}</TableCell>
                                <TableCell>{student.courses.map(({ title }) => title).join(', ')}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleEditStudent(student.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDeleteStudent(student.id)}
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
                    {editMode && (
                        <TextField
                            margin="dense"
                            label="ID"
                            name="id"
                            fullWidth
                            value={studentData.id || ''}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    )}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        name="name"
                        fullWidth
                        value={studentData.name}
                        onChange={handleInputChange}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={studentData.attendance}
                                onChange={handleAttendanceChange}
                            />
                        }
                        label="Attendance"
                    />
                    <TextField
                        margin="dense"
                        label="Performance"
                        name="performance"
                        fullWidth
                        value={studentData.performance}
                        onChange={handleInputChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Courses</InputLabel>
                        <Select
                            multiple
                            value={studentData.courseIds}
                            onChange={handleCourseChange}
                            renderValue={(selected) => getCourseTitlesByIds(selected)}
                        >
                            {courses.map((course) => (
                                <MenuItem key={course.id} value={course.id}>
                                    {course.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveStudent} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default StudentManagement;
