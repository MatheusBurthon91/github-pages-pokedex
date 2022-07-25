const ul = document.querySelector('.pokedex');
const getStart = document.querySelector('#start');
const buttonPk = document.querySelector('#getPk');
const getFinish = document.querySelector('#finish');
const body = document.querySelector('body');

const createLoading = () => {
  const load = document.createElement('h3');
  load.id = 'load';
  load.innerText = 'CARREGANDO...';
  body.appendChild(load);
}

const removeLoad = () => {
  const rescueLoad = document.querySelector('#load');
  body.removeChild(rescueLoad);
}

const requestPokemons = async(id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  createLoading();
  const fetchPk = await fetch(url);
  const resultPk = await fetchPk.json();
  removeLoad();
  return resultPk;
}


const getPokemonByIdOrName = async (id) => {
  const findPk = await requestPokemons(id);
  const idPk = findPk.id;
  const img = findPk.sprites.front_default;
  const name = findPk.name;
  const types = findPk.types.map(el => el.type.name).join(' | ');
  const typeStyle = findPk.types.map(el => el.type.name)[0];
  const height = findPk.height;
  const weight = findPk.weight;
  const tag = `<li class="card ${typeStyle}">
    <img class="card-image" src=${img} alt=${name} />
    <h2 class="card-title">${idPk} - ${name}</h2>
    <p>${height / 10} m - ${weight / 10} kg</p>
    <p class="card-subtitle">${types}</p>
  </li>`
  ul.innerHTML = tag;
}

const listPokemon = async (start, finish) => {
  const pokeList = [];
  for(let index = start; index <= finish; index += 1) {
    const pk = await requestPokemons(index);
    pokeList.push(pk);
  }
  return pokeList;
}

const addListPk = async (start, finish) => {
  const pklist = await listPokemon(start, finish);
  for(let index = 0; index < pklist.length; index += 1) {
    const li = document.createElement('li');
    li.classList = 'card';
    const id = pklist[index].id
    const pk = pklist[index].name;
    const img = pklist[index].sprites.front_default;
    const pkType = pklist[index].types.map(el => el.type.name).join(' | ');
    const pkTypeClass = pklist[index].types.map(el => el.type.name)[0];
    const height = pklist[index].height;
    const weight = pklist[index].weight;
    li.classList.add(`${pkTypeClass}`);
    li.innerHTML = `<img class="card-image" src=${img} alt=${pk} />
    <h2 class="card-title">${id} - ${pk}</h2>
    <p>${height/ 10} m - ${weight / 10} kg</p>
    <p class="card-subtitle">${pkType}</p>`
    ul.appendChild(li);
  }
}

addListPk(1, 493);

const transformDinamicPk = () => {
  buttonPk.addEventListener('click', (event) => {
    event.preventDefault();
    ul.innerHTML = '';
    addListPk(Number(getStart.value), Number(getFinish.value));
    getStart.value = '';
    getFinish.value = '';
  });
}


transformDinamicPk();

const findOnePk = () => {
  const buttonFind = document.querySelector('#button-find-pk');
  const inputFind = document.querySelector('#find-pk');
  buttonFind.addEventListener('click', () => {
    ul.innerHTML = '';
    getPokemonByIdOrName(inputFind.value)[0];
    inputFind.value = '';
  });
}

findOnePk();
