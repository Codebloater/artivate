import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

router.route("/upload-file", async (req, res) => {
  const { file, pinataMetadata } = req.body;

  const formData = new FormData();

  formData.append("file", file);
  formData.append("pinataMetadata", JSON.stringify(pinataMetadata));

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${process.env.JWT}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred during file upload." });
  }
});

export default router;
