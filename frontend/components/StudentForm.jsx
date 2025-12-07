import { useState, useEffect } from "react";
import "./StudentForm.css";

function StudentForm({ student, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    class: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        age: student.age,
        class: student.class,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống";
    }

    if (!formData.age || formData.age <= 0 || formData.age > 100) {
      newErrors.age = "Tuổi phải lớn hơn 0 và nhỏ hơn 100";
    }

    if (!formData.class.trim()) {
      newErrors.class = "Lớp không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="form-container">
      <h2>{student ? "✏️ Cập nhật học sinh" : "➕ Thêm học sinh mới"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
            placeholder="Nhập tên học sinh"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Tuổi:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={errors.age ? "error" : ""}
            placeholder="Nhập tuổi"
            min="1"
            max="100"
          />
          {errors.age && <span className="error-text">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="class">Lớp:</label>
          <input
            type="text"
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            className={errors.class ? "error" : ""}
            placeholder="Nhập lớp (VD: 10A1)"
          />
          {errors.class && <span className="error-text">{errors.class}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-submit">
            {student ? "💾 Cập nhật" : "➕ Thêm"}
          </button>
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            ❌ Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
