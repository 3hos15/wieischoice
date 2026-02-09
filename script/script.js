
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


const tabs = document.querySelectorAll(".tabs .tab");
const sections = document.querySelectorAll("main > section");

function showSection(className) {
  sections.forEach(section => {
    section.classList.toggle("active", section.classList.contains(className));
  });

  tabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.tab === className);
  });
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    showSection(tab.dataset.tab);
  });
});


showSection("travelPics");



// const base = "https://fdnd.directus.app/items"
// let endpoint = "/person?filter[squads][squad_id][tribe][name]=CMD%20Minor%20Web%20Dev&filter[squads][squad_id][cohort]=2526&sort=name&sort=name&limit=5"
// let url = base + endpoint

// let deLijst = document.querySelector("ul")

// getMinorMensen()

// async function getMinorMensen() {
//     let response = await fetch(url)

//     let responseJSON =  await response.json();

//     let deMinorMensen = responseJSON.data

//     console.log(deMinorMensen)

//     deMinorMensen.forEach( eenMinorMens =>{
//         console.log(eenMinorMens)

//         let minorMensHTML = 
//             `<li>
//                 <h2>${eenMinorMens.name}</h2>
//                 <p>${eenMinorMens.fav_tag}</p>
//             </li>`

//             deLijst.insertAdjacentHTML("beforeend", minorMensHTML)
//             // afterbegin kan ook
//     } )
// }
