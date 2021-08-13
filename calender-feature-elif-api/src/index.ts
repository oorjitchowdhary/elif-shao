import express from "express";
const fetch = require("node-fetch");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  "52377107831-nh6e64o2to1kq476s3fa06465gj4uvmq.apps.googleusercontent.com",
  "ytiNtx18ojYvADt3PDwzrdG4"
);

oAuth2Client.setCredentials({
  refresh_token:
    "1//04frgjk7sz4X-CgYIARAAGAQSNwF-L9Irl7WkRdvCwt_ZR5TQwJDZ1iNDt1TrmqiMib8cg8BPBIdxpKVI0b59Qmntxgsvz1n1k1Y",
});

const main = async () => {
  const app = express();
  app.get("/", async (_, res) => {
    const events = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/hraj2661999@gmail.com/events"
    );
    res.send(events);
  });

  app.listen(3002, () => {
    console.log(`Listening on port 3002`);
  });
};

main();
