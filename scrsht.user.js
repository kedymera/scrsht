// ==UserScript==
// @name         scrsht
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  take screenshot of the first video found on the page
// @author       kedymera
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let cvs = document.createElement("canvas");
let anchor = document.createElement("a");
let ctx;
let video;
const DELIM = ";";

function scrsht(e) {
    if (e.key == 'ArrowDown') {
        if (!video) {
            video = document.getElementsByTagName("video")[0];
            if (!video) {
                console.log("scrsht.js: no video found");
                return;
            }
            cvs.width = video.videoWidth;
            cvs.height = video.videoHeight;
            ctx = cvs.getContext("2d");
        }
        e.preventDefault();

        ctx.drawImage(video, 0, 0);

        anchor.setAttribute("href", cvs.toDataURL("image/png"));
        let name = location.pathname.split("/")[1];
        anchor.setAttribute("download", `${location.host}${DELIM}${name}${DELIM}${Date.now()}.png`);
        anchor.click();
    }
}

document.addEventListener('keydown', scrsht, false);
