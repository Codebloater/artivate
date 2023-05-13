import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => {
      console.log(`Mongoose Connected...`);
    })
    .catch((e) => {
      console.log(`Error in Mongoose Connection: ${e}`);
    });
};

export default connectDB;
