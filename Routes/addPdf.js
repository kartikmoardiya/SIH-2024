const express = require('express');
const router = express.Router();
const Pdf = require('../Models/pdf');

// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, callback) => {
//     return callback(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// const addPdf = async (req, res) => {
// //   let pdfFilename = req.file.filename;
// console.log(pdfFilename)

//   const data = new Pdf({
//     pdf: pdfFilename,
//   });

//   try {
//     await data.save();
//     res.status(200).json({
//       message: "PDF added successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

// router.post("/add", upload.single("pdf"), addPdf);




const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post("/upload-files", upload.single("file"), async (req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
        const data = new PDF({
            title: title,
            pdf: fileName
        });
        try {
            await data.save();
            res.status(200).json({
                message: "PDF added successfully",
                success: true,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error",
                success: false,
            });
        }
        res.send({ status: "ok" });
    } catch (error) {
        res.json({ status: error });
    }
});


router.get("/get-files", async (req, res) => {
    try {
      await Pdf.find({}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
  });
module.exports = router;