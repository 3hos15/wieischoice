// "/person?filter[id][_in]=286, 289"


// pick and drop game
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

// switch between tabs
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


// letterboxd last watched rss api
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


// code van de TMDB api
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODNiNWExODE4N2U2ODYzNjcyMjEzZGU0NTAzOWM0ZSIsIm5iZiI6MTc3MDgwMjQ3NS4wODQsInN1YiI6IjY5OGM0ZDJiOTY0NjQ3NzhjYTdiZTU1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NtPJVi7qISnPWOW4c1ob2STqqIQCUXmD2qEE8sTO-74'
//   }
// };

// fetch('https://api.themoviedb.org/3/authentication', options)
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.error(err));


