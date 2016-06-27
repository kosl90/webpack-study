const imgSmall = document.createElement("img");
imgSmall.src = require("./small.png");

const imgLarge = document.createElement("img");
imgLarge.src = require("./large.png");

document.body.appendChild(imgSmall);
document.body.appendChild(imgLarge);
