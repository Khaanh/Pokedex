let url = "https://pokeapi.co/api/v2/pokemon/";
// let img = document.querySelector(".pokedex-img");
let holder = document.querySelector(".pokedex-holder");
let searchControl = document.querySelector(".form-search");
let searchBtn = document.querySelector(".form-btn");

searchBtn.addEventListener("click", function () {
  let id = searchControl.value;
  let flag =
    document.querySelector(".pokedex-img") &&
    document.querySelector(".pokedex-name") &&
    document.querySelector(".pokedex-id")
      ? true
      : false;

  callPokemon(id, appendPokemon, flag);
});

async function callPokemon(id, appendPokemon, status) {
  let info = {};
  try {
    let response = await fetch(`${url}${id}`);
    let data = await response.json();

    info.src = data.sprites.other.dream_world.front_default;
    info.id = data.id;
    info.name = data.species.name;
    console.info("data", data);
  } catch (error) {
    console.error("error", error);
  }

  appendPokemon(info, status);
}

function appendPokemon(obj, status) {
  if (status == true) {
    let id = document.querySelector(".pokedex-id");
    let name = document.querySelector(".pokedex-name");
    let img = document.querySelector(".pokedex-img img");

    img.setAttribute("src", obj.src);
    id.textContent = `ID: ${obj.id}`;
    name.textContent = obj.name;
  } else {
    let fragment = new DocumentFragment();
    let img = document.createElement("img");
    let imgSrc = obj.src;
    let pokedexName = document.createElement("div");
    let pokedexId = document.createElement("span");
    let pokedexImg = document.createElement("i");

    pokedexId.classList.add("pokedex-id");
    pokedexName.classList.add("pokedex-name");
    pokedexImg.classList.add("pokedex-img");

    holder.appendChild(pokedexImg);
    holder.appendChild(pokedexName);
    holder.appendChild(pokedexId);

    pokedexName.textContent = obj.name;
    pokedexId.textContent = `ID: ${obj.id}`;
    img.setAttribute("src", imgSrc);

    pokedexImg.appendChild(img);
    fragment.appendChild(pokedexName);
    fragment.appendChild(pokedexId);
    holder.appendChild(fragment);
  }
}
