import mongoose from "mongoose";
import Student from "./Student.js";

const seedData = [
  {
    name: "Nguyễn Văn A",
    age: 16,
    class: "10A1",
  },
  {
    name: "Trần Thị B",
    age: 16,
    class: "10A1",
  },
  {
    name: "Lê Văn C",
    age: 17,
    class: "10A2",
  },
  {
    name: "Phạm Thị D",
    age: 17,
    class: "10A2",
  },
  {
    name: "Hoàng Văn E",
    age: 16,
    class: "10A3",
  },
  {
    name: "Đinh Văn F",
    age: 18,
    class: "10A3",
  },
  {
    name: "Bùi Thị G",
    age: 17,
    class: "10A1",
  },
  {
    name: "Vũ Văn H",
    age: 16,
    class: "10A2",
  },
];

async function seedDatabase() {
  try {
    // Kết nối MongoDB
    await mongoose.connect("mongodb://localhost:27017/student_db");
    console.log("✅ Kết nối MongoDB thành công");

    // Xóa dữ liệu cũ (tuỳ chọn)
    await Student.deleteMany({});
    console.log("🗑️ Đã xóa dữ liệu cũ");

    // Thêm dữ liệu mới
    const result = await Student.insertMany(seedData);
    console.log(`✅ Đã thêm ${result.length} học sinh`);

    // Hiển thị dữ liệu
    const allStudents = await Student.find();
    console.log("\n📚 Danh sách học sinh:");
    console.table(allStudents);

    // Đóng kết nối
    await mongoose.connection.close();
    console.log("\n✅ Hoàn thành!");
  } catch (error) {
    console.error("❌ Lỗi:", error);
    process.exit(1);
  }
}

seedDatabase();
