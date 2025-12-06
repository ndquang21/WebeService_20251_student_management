import expess from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import Student from "./Student.js";

const app = expess();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/student_db")
  .then(() => console.log("Đã kết nối MongoDB thành công"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Hello from Express.js backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
