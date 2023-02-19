// https://superheroapi.com/api/access-token/character-id
const SUPERHERO_TOKEN = '128971516746533'
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`
const newHeroButton = document.getElementById('newHero')
const heroImageDiv = document.getElementById('heroImage')
const searchButtonDiv = document.getElementById('searchButton')
const searchInput = document.getElementById('searchInput')
const enterKey = document.addEventListener('keycode', [13])

const getSuperHero = (id, name) => {
  fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
      const superHero = json
      showHeroInfo(superHero)
    })

}
const showHeroInfo = (character) => {
  const name = `<h2>${character.name}</h2>`

  const img = `<img src="${character.image.url}" height=350 width=300`

  const stats = Object.keys(character.powerstats).map(stat => {
    return `<p>${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
  }).join('')

  const bio = Object.keys(character.biography).map(info => {
    return `<p>${info.toUpperCase()}: ${character.biography[info]}</p>`
  }).join('')

  const work = `<h3>${character.work.occupation}</h3>`

  const looks = Object.keys(character.appearance).map(look => {
    return `<p>${look.toUpperCase()}: ${character.appearance[look]}</p>`
  }).join('')

  heroImageDiv.innerHTML = `${name}<br>${img}<br> ${work}${stats}Appearance: ${looks}<br>Origins:${bio}`
  console.log()
}

const getSearchSuperHero = (name) => {
  fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      const hero = json.results[0]
      showHeroInfo(hero)
    })
}

const randomHero = () => {
  const numberOfHeroes = 731
  return Math.floor(Math.random() * numberOfHeroes) + 1
}
newHeroButton.onclick = () => getSuperHero(randomHero())

searchButtonDiv.onclick = () => getSearchSuperHero(searchInput.value)

document.addEventListener('keypress', (event) => {
  let keyCode = event.keyCode ? event.keyCode : event.which;
  if (keyCode == 13) {
    return getSearchSuperHero(searchInput.value)
  }
})