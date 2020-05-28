 module.exports = {
     getRandom(max, min) {
         return Math.floor(Math.random() * (max - min)) + min;
     }
 }