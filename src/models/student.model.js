const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    
    isActive: { type: Boolean, default: true } 
  },
  { timestamps: true }
);

module.exports.Student = mongoose.model("Student", studentSchema);
