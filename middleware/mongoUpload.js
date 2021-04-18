var fs = require("fs");
var mongo = require("mongodb").MongoClient;
var Binary = require("mongodb").Binary;

fs.readFile("druglist.json", function (err, data) {
  var json = JSON.parse(data);
  //Sot the list of drug objects by drugname alphabetically
  json.sort((a, b) => (a.drug > b.drug ? 1 : b.drug > a.drug ? -1 : 0));
  //   fs.readdir("../drugnamesAudio", function (err, data) {
  //     let i = 0;
  //     data.forEach(function (file) {
  //       try {
  //         let filename = file.toString();
  //         var archivobin = fs.readFileSync(`../drugnamesAudio/${filename}`);
  //         var invoice = {};
  //         invoice.bin = Binary(archivobin);
  //         invoice.id = file.toString().slice(0, -4);
  //         json[i].drugAudio = {};
  //         json[i].drugAudio.bin = Binary(archivobin);
  //         i++;
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     });
  fs.writeFile("druglist2.json", JSON.stringify(json), function (err) {
    if (err) throw err;
    console.log("complete");
  });
});
//});
