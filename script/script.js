
const gameSection = document.querySelector(".headGame");
const headArea = gameSection.querySelector("#head");
const faceParts = gameSection.querySelectorAll(".scramble");

let currentlyDragged = null;

faceParts.forEach(function (img) {
  img.setAttribute("draggable", "true");

  img.addEventListener("dragstart", function () {
    currentlyDragged = img.closest("picture") || img; 
  });
});

headArea.addEventListener("dragover", function (event) {
  event.preventDefault();
});

headArea.addEventListener("drop", function (event) {
  event.preventDefault();
  if (!currentlyDragged) return;

  headArea.appendChild(currentlyDragged);
  currentlyDragged.classList.add("placedPart");

  const rect = headArea.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  currentlyDragged.style.left = x + "px";
  currentlyDragged.style.top = y + "px";

  currentlyDragged = null;
});



