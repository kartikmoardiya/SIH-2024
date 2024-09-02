const express = require('express');
const router = express.Router();
const Pdf = require('../Models/pdf');
const app = express();

app.use("/files", express.static("files"))
const fs = require("fs");
const path = require('path');
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
        const data = new Pdf({
            title: title,
            pdf: fileName
        });
        try {
            await data.save();
            return res.status(200).json({
                message: "PDF added successfully",
                success: true,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal server error",
                success: false,
            });
        }
        res.send({ status: "ok" });
    } catch (error) {
        res.json({ status: error });
    }
});


// router.post("/get-files", async (req, res) => {
//     try {
//       const pdfTitle=req.body.title;
//       const dbpdf=await Pdf.find({
//         title:pdfTitle
//       })
//       const pdfName=dbpdf.pdf;
//       console.log(pdfName);
//       const file=fs.link(`files/${pdfName.pdf}`, () => {});
//       return res.status(200).json({
//         success:"true",
//         pdf:file
//       })
//     } catch (error) {
//         return res.status(501).json({
//             success:"false",
//         })
//     }
//   });

router.post("/get-files", async (req, res) => {
    try {
        const pdfTitle = req.body.title;


        const dbpdf = await Pdf.findOne({ title: pdfTitle });
        console.log(dbpdf);
        if (!dbpdf) {
            return res.status(404).json({
                success: "false",
                message: "PDF not found in database"
            });
        }

        const pdfName = dbpdf.pdf;

        res.json({path : pdfName})
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: "false",
            message: "Server error"
        });
    }
});
module.exports = router;