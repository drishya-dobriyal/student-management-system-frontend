import React from 'react';
import StudentForm from '../components/StudentForm';
import { useParams } from 'react-router-dom';

function StudentFormPage() {
    const { id } = useParams();
    return (
        <>
            <h1>{id ? 'Edit Student' : 'Add Student'} Page</h1>
            <StudentForm />
        </>
    );
}

export default StudentFormPage;
