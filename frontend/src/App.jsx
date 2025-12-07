import { useState, useEffect } from "react";
import axios from "axios";
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:5000/api/students";

  // Fetch danh sách học sinh
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      setMessage("❌ Lỗi khi tải danh sách: " + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Thêm học sinh mới
  const handleAddStudent = async (formData) => {
    try {
      const response = await axios.post(API_URL, formData);
      setStudents([response.data, ...students]);
      setShowForm(false);
      setMessage("✅ Thêm học sinh thành công!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Lỗi: " + error.response?.data?.error || error.message);
    }
  };

  // Cập nhật học sinh
  const handleUpdateStudent = async (formData) => {
    try {
      const response = await axios.put(
        `${API_URL}/${editingStudent._id}`,
        formData
      );
      setStudents(
        students.map((s) => (s._id === response.data._id ? response.data : s))
      );
      setShowForm(false);
      setEditingStudent(null);
      setMessage("✅ Cập nhật thành công!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Lỗi: " + error.response?.data?.error || error.message);
    }
  };

  // Xóa học sinh
  const handleDeleteStudent = async (id) => {
    if (confirm("Bạn chắc chắn muốn xóa học sinh này?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setStudents(students.filter((s) => s._id !== id));
        setMessage("✅ Xóa thành công!");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("❌ Lỗi: " + error.response?.data?.error || error.message);
      }
    }
  };

  // Mở form edit
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  // Đóng form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Quản lý Học sinh</h1>
        <p>Hệ thống quản lý thông tin học sinh</p>
      </header>

      <main className="container">
        {message && (
          <div
            className={`message ${
              message.includes("✅") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}

        {!showForm ? (
          <>
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              ➕ Thêm học sinh mới
            </button>

            {loading ? (
              <p className="loading">⏳ Đang tải...</p>
            ) : students.length === 0 ? (
              <p className="no-data">Chưa có học sinh nào</p>
            ) : (
              <StudentList
                students={students}
                onEdit={handleEditStudent}
                onDelete={handleDeleteStudent}
              />
            )}
          </>
        ) : (
          <StudentForm
            student={editingStudent}
            onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
            onCancel={handleCloseForm}
          />
        )}
      </main>
    </div>
  );
}

export default App;
