import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Lỗi khi fetch danh sách:", error));
  }, []);

  return (
    <>
      <h1>Danh sách học sinh</h1>
      {students.length === 0 ? (
        <p>Đang tải danh sách học sinh...</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.name} - Tuổi: {student.age} - Lớp: {student.class}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
