import "./StudentList.css";

function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="student-list">
      <table className="table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.class}</td>
              <td className="actions">
                <button
                  className="btn btn-edit"
                  onClick={() => onEdit(student)}
                >
                  ✏️ Sửa
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => onDelete(student._id)}
                >
                  🗑️ Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
