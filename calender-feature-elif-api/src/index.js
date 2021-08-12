"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fetch = require("node-fetch");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const oAuth2Client = new OAuth2("52377107831-nh6e64o2to1kq476s3fa06465gj4uvmq.apps.googleusercontent.com", "ytiNtx18ojYvADt3PDwzrdG4");
oAuth2Client.setCredentials({
    refresh_token: "1//04frgjk7sz4X-CgYIARAAGAQSNwF-L9Irl7WkRdvCwt_ZR5TQwJDZ1iNDt1TrmqiMib8cg8BPBIdxpKVI0b59Qmntxgsvz1n1k1Y",
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        const events = yield fetch("https://www.googleapis.com/calendar/v3/calendars/hraj2661999@gmail.com/events");
        res.send(events);
    }));
    app.listen(3002, () => {
        console.log(`Listening on port 3002`);
    });
});
main();
//# sourceMappingURL=index.js.map