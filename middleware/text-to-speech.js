const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");
const projectId = "canadian-drug-speak";
const keyFilename = "GOOGLE_AUTHENTICATION_CREDENTIALS.json";
const client = new textToSpeech.TextToSpeechClient({ projectId, keyFilename });

module.exports = async function TTS(text) {
  //Use the line below if you want to save the file to an mp3
  //const outputFileName = `${text}.mp3`;
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (these values can be configured)
    // voice: {
    //     languageCode: "en-US",
    //     ssmlGender: "NEUTRAL"
    //  },
    voice: {
      languageCode: "en-US",
      name: "en-US-Wavenet-F",
    },
    // select the type of audio encoding
    //audioConfig: { audioEncoding: "MP3" },
    audioConfig: {
      audioEncoding: "LINEAR16",
      pitch: 0,
      speakingRate: 1.0,
    },
    outputFileName: outputFileName,
  };
  const [response] = await client.synthesizeSpeech(request);

  //Saves the audio to an mp3 file
  //This currently is working but I want to play the file when the html audio element play button is pressed instead of saving it to an mp3 when this js file is run
  //   const writeFile = util.promisify(fs.writeFile);
  //   await writeFile(outputFileName, response.audioContent, "binary");
  //   console.log(`Audio content written to file: ${outputFileName}`);
  return response.audioContent;
};
