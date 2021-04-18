const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

//To load all of the mp3 files from a folder into mongoDB use the following commands in powershell
//$files = Get-ChildItem PATH_TO_FOLDER_CONTAINING_MP3_FILES
//ForEach($file in $files){mongofiles --uri mongodb+srv://SODV2999:<PASSWORD>@canadian-drug-speak.zi5z5.mongodb.net/<DATABASE> -d=database_name_here put $file}

router.get("/init-data", (req, res) => {});
//  @route          GET api/audio
//  @description    Get audio file from mongodb with gridfs based on url filename parameter and start a download stream
//  @access         Private
router.get("/:filename", async (req, res) => {
   try {
      var audioFiledata = await mongoose.connection.db
         .collection("fs.files")
         .findOne({ filename: req.params.filename });
      var audioFileObjectId = new ObjectId(audioFiledata._id);
   } catch (err) {
      return res
         .status(400)
         .json({ message: "Invalid filename in URL parameter" });
   }
   res.set("content-type", "audio/mpeg");
   res.set("accept-ranges", "bytes");

   let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "fs",
   });
   let downloadStream = bucket.openDownloadStream(audioFileObjectId);
   downloadStream.on("data", (chunk) => {
      res.write(chunk);
   });

   downloadStream.on("error", () => {
      res.sendStatus(404);
   });

   downloadStream.on("end", () => {
      res.end();
   });
});

//  @route              POST api/audio
//  @description        Post audio
//  @access             Private
router.post("/", (req, res) => {
   upload.single("audio")(req, res, (err) => {
      if (err) {
         return res
            .status(400)
            .json({ message: "Upload Request Validation Failed" });
      } else if (!req.body.name) {
         return res
            .status(400)
            .json({ message: "No audio file name in request body" });
      }

      let audioFile = req.body.name;

      // Covert buffer to Readable Stream
      const readableAudioStream = new Readable();
      readableAudioStream.push(req.file.buffer);
      readableAudioStream.push(null);

      let bucket = new mongodb.GridFSBucket(db, {
         bucketName: "audioFiles",
      });

      let uploadStream = bucket.openUploadStream(audioFile);
      let id = uploadStream.id;
      readableAudioStream.pipe(uploadStream);

      uploadStream.on("error", () => {
         return res.status(500).json({ message: "Error uploading file" });
      });

      uploadStream.on("finish", () => {
         return res.status(201).json({
            message:
               "File uploaded successfully, stored under Mongo ObjectID: " + id,
         });
      });
   });
});

module.exports = router;
