import mongoose from "mongoose";

// Newsletter schema and model
const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default newsletterSchema;
