const { json } = require("express");
const express = require("express");
const router = express.Router();
const druglist = require("../druglist.json");
// const authentication = require("../middleware/authentication");
// const { check, validationResult } = require("express-validator");
const fs = require("fs");

const Druglist = require("../models/Druglist");

// @route   GET     api/drugs
// @desc            Get all drug names in the textbook
// @access          Private
router.get("/", async (req, res) => {
   try {
      const druglist = await Druglist.find({});
      // use the command below to upload the druglist.json to populate mongoDB with the list of drugs
      //mongoimport --uri mongodb+srv://SODV2999:<PASSWORD>@canadian-drug-speak.zi5z5.mongodb.net/<DATABASE> --collection tests --file druglist1.json --jsonArray
      //mongoimport --uri mongodb+srv://umy9145:grewal822@cluster0.rldwz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority --collection tests --file druglist1.json --jsonArray

      //Use the functions below to pull all drug objects in the druglist collection from mongoDB and write them to a .json file
      // const druglist = await Druglist.find({});
      // var json = JSON.stringify(druglist);
      // console.log("started writing");
      // fs.writeFile("druglist.json", json, function (err) {
      //    if (err) throw err;
      //    console.log("complete");
      // });
      //
      //Or use this command in powershell with mongoDB installed on the local operating system
      //mongoexport --uri mongodb+srv://SODV2999:<PASSWORD>@canadian-drug-speak.zi5z5.mongodb.net/<DATABASE> --collection druglist --type jsonArray --out newDruglist.json
      res.json(druglist);
   } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
   }
});

// router.post("/init-data", async (req, res) => {
//    druglist.forEach((x) => {
//       delete x._id;
//       delete x.__v;
//       const newDrug = new Druglist({ ...x });
//       newDrug.save();
//    });
//    res.send("data saved");
// });

// router.post("/save", async (req, res) => {
//    console.log(req.body);
//    const drugs = req.body.drugs;
//    console.log(typeof drugs);
//    const ids = drugs.map((x) => x.id);

//    //Updating and adding new ones.
//    drugs.slice(0, 5).forEach(async (drug) => {
//       try {
//          const doesDrugExist = await Druglist.exists({ _id: drug.id });
//          console.log(doesDrugExist);
//          if (!doesDrugExist) {
//             console.log(drug);
//             const newDrug = new Druglist({ ...drug });
//             const saveDrug = await newDrug.save();
//             // res.send(newDrug);
//          } else {
//             console.log(drug);
//             const newDrug = new Druglist({ ...drug });
//             await newDrug.save();
//             // res.send("Updated");
//          }
//       } catch (error) {
//          console.log(error);
//       }
//    });
//    //Deleting
//    const allDrugs = await Druglist.find();
//    allDrugs.forEach(async (drug) => {
//       if (!ids.includes(drug._id)) {
//          await Druglist.deleteOne({ _id: drug._id });
//          console.log("deleted");
//       }
//    });
//    res.send("Saved");
// });

// @route   PUT     api/drugs
// @desc            Add a new drug
// @access          Private
// router.post('/', (req, res) => {
//     res.send('Update drug');
// })

// router.put("/", (req, res) => {
//    try{
//       const newDrug = new Druglist({drug: ["  "], alternateName: [" "], category: })
//    }
//    res.send("New drug added");
// });

// @route   DELETE     api/drugs
// @desc            Add a new drug
// @access          Private
// router.post('/', (req, res) => {
//     res.send('Delete drug');
// })
router.post("/", async (req, res) => {
   const drugs = req.body.drugs;
   try {
      drugs.forEach(async (drug) => {
         await Druglist.findByIdAndUpdate(drug._id, drug);
      });
   } catch (e) {
      console.log(e);
   }
   res.send("Data updated");
});
router.delete("/", async (req, res) => {
   try {
      await Druglist.deleteOne({ _id: req.body._id });
   } catch (e) {
      console.log(e);
   }
   res.send("Drug deleted");
});

router.put("/", async (req, res) => {
   const newDrug = new Druglist({
      drug: [""],
      alternateName: [""],
      catagory: "   ",
      subCatagory: "  ",
      chapter: "    ",
   });
   try {
      await newDrug.save();
   } catch (e) {
      console.log(e);
   }
   res.send("new one added");
});

module.exports = router;
