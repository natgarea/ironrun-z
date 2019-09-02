const n = 20; //number of images
const w = 416 * .36; // width
const h = 454 * .36; // height
let theHTML = "";
function createSpriteSheet (n, w, h) {
    for (let i = 1; i < n; i++) {
        theHTML += `<img src="Users/natalia/Documents/ironhack/week3/ironrun-z/img/player/female/Run_(${i}).png" width="${w}"
        height="${h}" />`
    }
}
createSpriteSheet(n,w,h);
document.querySelector("body").innerHTML= theHTML;
document.querySelector("body").style.backgroundColor = black;