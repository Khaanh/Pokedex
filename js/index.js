let url = "https://pokeapi.co/api/v2/pokemon/";
let img = document.querySelector(".pokedex-img");
let holder = document.querySelector(".pokedex-holder");
let searchControl = document.querySelector(".form-search");
let searchBtn = document.querySelector(".form-btn");

searchBtn.addEventListener("click", function () {
  let id = searchControl.value;
  callPokemon(id, appendPokemon);
});

async function callPokemon(id, appendPokemon) {
  let info = {};
  try {
    let response = await fetch(`${url}${id}`);
    let data = await response.json();

    info.src = data.sprites.other.dream_world.front_default;
    info.id = data.id;
    info.name = data.species.name;
  } catch (error) {
    error.log("error", error);
  }

  appendPokemon(info);
}

function appendPokemon(obj) {
  let fragment = new DocumentFragment();
  let pokedexImg = document.createElement("img");
  let imgSrc = obj.src;
  let pokedexName = document.createElement("div");
  let pokedexId = document.createElement("span");

  pokedexId.classList.add("pokedex-id");
  pokedexName.classList.add("pokedex-name");
  holder.appendChild(pokedexName);
  holder.appendChild(pokedexId);

  pokedexName.textContent = obj.name;
  pokedexId.textContent = `ID: ${obj.id}`;
  pokedexImg.setAttribute("src", imgSrc);

  img.appendChild(pokedexImg);
  fragment.appendChild(pokedexName);
  fragment.appendChild(pokedexId);
  holder.appendChild(fragment);
}
