// Pick and drop game

// Bronnen:
// https://dev.to/lensco825/making-a-simple-drag-and-drop-with-js-29l2
// https://www.w3schools.com/html/html5_draganddrop.asp
// https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
// https://www.reddit.com/r/learnprogramming/comments/7ful05/i_would_like_to_create_a_drag_and_drop_dress_up/


const gameSection = document.querySelector(".headGame");
const headArea = gameSection.querySelector("#head");
const faceParts = gameSection.querySelectorAll(".scramble");

let currentlyDragged = null;

faceParts.forEach(function (img) {
  img.setAttribute("draggable", "true");

  img.addEventListener("dragstart", function () {
    currentlyDragged = img; 
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

// Switch between tabs
// Bron: uit mijn eigen code van eerder gemaakte website
const tabs = document.querySelectorAll(".tabs .tab");
const sections = document.querySelectorAll("main > section");

function showSection(className) {
  sections.forEach(function (section) {
    section.classList.toggle("active", section.classList.contains(className));
  });

  tabs.forEach(function (tab) {
    tab.classList.toggle("active", tab.dataset.tab === className);
  });
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    showSection(tab.dataset.tab);
  });
});

showSection("travelPics");


// random student movie title fdnd api
const studentList = document.querySelector("#studentFilmsList");

const fdndBase = "https://fdnd.directus.app/items";
const fdndEndpoint =
  "/person?filter[squads][squad_id][tribe][name]=CMD%20Minor%20Web%20Dev&filter[squads][squad_id][cohort]=2526&sort=name&filter[fav_movie][_nempty]";

const fdndUrl = fdndBase + fdndEndpoint;

//random student on site
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function loadRandomStudentFilm() {
  if (!studentList) return;

  const res = await fetch(fdndUrl);
  const data = await res.json();
  const students = data.data || [];
  const student = pickRandom(students);

  studentList.innerHTML = `
    <li>
      <h2 class="studentname">${student.name}</h2>
      <p class="studentfavfilm">${student.fav_movie}</p>
    </li>
  `;
}

loadRandomStudentFilm();

// refresh button
const refreshStudent = document.querySelector("#refresh");

refreshStudent.addEventListener("click", loadRandomStudentFilm);

const container = document.querySelector("#letterboxd");
const username = "3hos15";
const rss = `https://letterboxd.com/${username}/rss/`;
const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`;

fetch(api)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const items = (data.items || []).slice(0, 8);

    items.forEach(function (item) {
      const temp = document.createElement("div");
      temp.innerHTML = item.description;

      const img = temp.querySelector("img");
      const poster = img ? img.src : "";

      const title = item.title;

      const card = document.createElement("a");
      card.className = "lb-card";
      card.href = item.link;
      card.target = "_blank";

      card.innerHTML = `
        <div class="lb-poster">
          ${poster ? `<img src="${poster}" alt="${title} poster" loading="lazy">` : ""}
        </div>
        <h3 class="lb-title">${title}</h3>
      `;

      container.appendChild(card);
    });
  })


