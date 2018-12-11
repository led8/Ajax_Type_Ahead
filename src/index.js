const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = new Array;

fetch(endpoint)
  .then(function(blob){
    blob.json()
  .then(function(data){
    cities.push(...data);
  });
  });

function findCityOrState(userInput, cities){
  return cities.filter(function(word){
    const regex = new RegExp(userInput, 'gi');
    return word.city.match(regex) || word.state.match(regex);
  });
};

function displayResult(){
  const allResult = findCityOrState(this.value, cities);
  const result = allResult.map((result) => {
    const regex = new RegExp(this.value, 'gi');
    const highlightCity = result.city.replace(regex, `<span class="hl">${this.value}</span>`)
    const highlightState = result.state.replace(regex, `<span class="hl">${this.value}</span>`)
    return `
      <li>
        <span class="name">${highlightCity}, ${highlightState}</span>
        <span class="population">${result.population}</span>
      </li>
    `
  }).join('');
  suggestions.innerHTML = result;
};

const search = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions');

search.addEventListener('keyup', displayResult);
search.addEventListener('change', displayResult);
