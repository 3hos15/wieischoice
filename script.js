const trail = document.getElementById("cursorTrail");

const images = [
  "images/castle.JPG",
  "images/cathedral.JPG",
  "images/grave.jpg",
  "images/graveview.jpg",
  "images/horses.jpg",
  "images/busker.jpg",
  "images/canon.jpg",
  "images/canonview.jpg",
  "images/victoriastreet.jpg",
  "images/museum.JPG"
];

// arrays to store elements and positions
const imageElements = [];
const imageX = [];
const imageY = [];

// let nameGuess = document.querySelector('.guess');


for (let i = 0; i < images.length; i++) {
  const img = document.createElement("img");
  img.src = images[i];
  trail.append(img);

  imageElements.push(img);
  imageX.push(0);
  imageY.push(0);
}

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
    let x = mouseX;
    let y = mouseY;
  
    const spacing = 60; 
    const speed = 0.08; 
  
    for (let i = 0; i < imageElements.length; i++) {
      const targetX = x - spacing;
      const targetY = y + spacing;
  
      imageX[i] += (targetX - imageX[i]) * speed;
      imageY[i] += (targetY - imageY[i]) * speed;
  
      imageElements[i].style.transform =
        "translate(-50%, -50%) translate(" + imageX[i] + "px, " + imageY[i] + "px)";
  
      x = imageX[i]; //images flwoing
      y = imageY[i];
    }
  
    requestAnimationFrame(animate);
  }
  

animate();



