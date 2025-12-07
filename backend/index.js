import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import Student from "./Student.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Kết nối MongoDB
mongoose
  .connect("mongodb://localhost:27017/student_db")
  .then(() => console.log("✅ Đã kết nối MongoDB thành công"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Route test
app.get("/", (req, res) => {
  res.send("Hello from Express.js backend!");
});

// ========== API CRUD ==========

// 1️⃣ GET - Lấy tất cả học sinh
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2️⃣ GET - Lấy 1 học sinh theo ID
app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Không tìm thấy học sinh" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3️⃣ POST - Thêm học sinh mới
app.post("/api/students", async (req, res) => {
  try {
    const { name, age, class: className } = req.body;

    // Validate dữ liệu
    if (!name || !age || !className) {
      return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin" });
    }

    const newStudent = new Student({
      name,
      age,
      class: className,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4️⃣ PUT - Cập nhật học sinh
app.put("/api/students/:id", async (req, res) => {
  try {
    const { name, age, class: className } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, class: className },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Không tìm thấy học sinh" });
    }

    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5️⃣ DELETE - Xóa học sinh
app.delete("/api/students/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Không tìm thấy học sinh" });
    }

    res.json({ message: "Đã xóa thành công", student: deletedStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});

export default app;
