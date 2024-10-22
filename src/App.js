import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from "react";
import { Form, Button, Table, Row, Col, Badge } from "react-bootstrap";

const StudentManager = () => {
  // Default student list
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyen Van A", code: "CODE12345", isActive: true },
    { id: 2, name: "Tran Van B", code: "CODE67890", isActive: false },
  ]);

  // State to keep track of selected students
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [stillActive, setStillActive] = useState(false);

  // Handle selecting students
  const handleSelectStudent = (id) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle adding a new student to the top of the list
  const handleAddStudent = () => {
    const newStudent = {
      id: students.length + 1,
      name: studentName,
      code: studentCode,
      isActive: stillActive,
    };
    setStudents([newStudent, ...students]); // Add new student to the top of the list
    setStudentName("");
    setStudentCode("");
    setStillActive(false);
  };

  // Handle deleting a student from the list
  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
    setSelectedStudents(selectedStudents.filter((studentId) => studentId !== id));
  };

  // Handle clearing the list of students
  const handleClearAllStudents = () => {
    setStudents([]);
    setSelectedStudents([]);
  };




  return (
    <div className="p-4">
      {/* Display the number of selected students */}
      <h3>Total Selected Student: {selectedStudents.length}</h3>

      {/* Form to add a new student */}
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Student Code"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
            />
          </Col>
          <Col>
            <Button variant="primary" onClick={handleAddStudent}>
              Add
            </Button>
          </Col>
        </Row>
        <Form.Check
          type="checkbox"
          label="Still Active"
          checked={stillActive}
          onChange={(e) => setStillActive(e.target.checked)}
        />
      </Form>

      {/* Button to clear all students */}
      <Button variant="secondary" className="my-3" onClick={handleClearAllStudents}>
        Clear
      </Button>

      {/* Table to display the list of students */}
      <Table bordered hover>
        <thead>
          <tr>
            <th>Select</th>
            <th>Student Name</th>
            <th>Student Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => handleSelectStudent(student.id)}
                />
              </td>
              <td>{student.name}</td>
              <td>{student.code}</td>
              <td>
                <Badge bg={student.isActive ? "info" : "danger"}>
                  {student.isActive ? "Active" : "In-active"}
                </Badge>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentManager;

