//You can edit ALL of the code here
const rootElem = document.querySelector("#root");
const body = document.querySelector("body");
const search = document.createElement("input");
search.setAttribute("type", "text");
search.setAttribute("placeholder", "Search..");
search.setAttribute("size", "30");
body.prepend(search);

const countingEp = document.createElement("p");
countingEp.setAttribute("id", "countingEp");
body.prepend(countingEp);

function makePage(episodeList) {
  displayAll(episodeList);
  searchEpisodes();
  selectEpisodes(episodeList);
  displayEpisodesFound(episodeList);
}

const select = document.querySelector("#episodeSelector");
function selectEpisodes(episodeList) {
  episodeList.forEach((element) => {
    const option = document.createElement("option");
    select.appendChild(option);
    const episodeCode = `S0${element.season}E0${element.number}`;
    option.innerHTML = `${element.name} - ${episodeCode}`;
  });
}

select.addEventListener("change", (event) => {
  let selection = event.target.value;
  let splitSelect = selection.split(" -");
  search.value = splitSelect[0];
});

function displayAll(episodeList) {
  rootElem.innerHTML = "";

  return episodeList.forEach((element) => {
    const movieLink = document.createElement("a");
    const epCard = document.createElement("div");
    const epTitle = document.createElement("h3");
    const epImg = document.createElement("img");
    const summary = document.createElement("p");

    rootElem.appendChild(epCard);
    epCard.appendChild(movieLink);
    movieLink.appendChild(epTitle);
    movieLink.appendChild(epImg);
    epCard.appendChild(summary);
    epCard.classList.add("epCard");
    epTitle.classList.add("epTitle");
    epImg.classList.add("epImg");
    movieLink.href = element.url;

    epImg.setAttribute("src", `${element.image.medium}`);
    const episodeCode = `S0${element.season}E0${element.number}`;
    epTitle.innerHTML += `${element.name} - ${episodeCode}`;
    epCard.innerHTML += element.summary;
  });
}

function searchEpisodes() {
  rootElem.innerHTML = "";
  const allEpisodes = getAllEpisodes();
  let input = search.value.toLowerCase();
  if (input.length === 0) {
    return allEpisodes;
  }
  const newEpisodesList = [];
  for (let i = 0; i < allEpisodes.length; i++) {
    let episodesText =
      allEpisodes[i].name.toLowerCase() + allEpisodes[i].summary.toLowerCase();
    if (episodesText.includes(input)) {
      newEpisodesList.push(allEpisodes[i]);
    }
  }
  return newEpisodesList;
}

function displayEpisodesFound() {
  rootElem.innerHTML = "";
  const episodesFound = searchEpisodes();
  console.log(displayAll(episodesFound));
  countingEp.textContent = `Got ${episodesFound.length} / ${
    getAllEpisodes().length
  } episode(s)`;

  return displayAll(episodesFound);
}

function setup() {
  const allEpisodes = getAllEpisodes();
  makePage(allEpisodes);
  search.addEventListener("keyup", displayEpisodesFound);
  countingEp.textContent = `Got ${allEpisodes.length} / ${allEpisodes.length} episode(s)`;
}

window.onload = setup;
