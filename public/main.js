// async fetchLocations(){
//   const response = await fetch("/locations")
//   const locations = await response.json()
//   console.log("location data", locations)
// }
const login = document.querySelector("#login")
login.className = "hidden"
const home = document.querySelector("#home")
home.className = "home"
const reservations = document.querySelector("#reservations")
const locationContainer = document.querySelector("#locationContainer")
locationContainer.className = "locationContainer"
const mapPicker = document.querySelector("#map-picker")
mapPicker.className = "map-picker"
let logo  = document.querySelector("#logo")

logo.addEventListener('click',(e) =>{
  buildHome() 
})
function buildHome(){
  let hidden = document.querySelectorAll("#main > div:not(#home)")
  hidden.forEach(el => {
    el.className = 'hidden'
  })
  home.className = 'home'
}  
let loginBtn = document.querySelector("#loginBtn")
loginBtn.addEventListener('click',(e) =>{
  buildLogin() 
})
function buildLogin(){
  let hidden = document.querySelectorAll("#main > div:not(#login)")
  hidden.forEach(el => {
    el.className = 'hidden'
  })
  login.className = 'login'
}

fetch("/locations")
  .then((res) => res.json())
  .then((data) => {
    buildLocationMenu(data)
    console.log("location data", data);
});
function buildLocationMenu(arr){
  arr.forEach(el =>{
    let locationItm = document.createElement("div")
    locationItm.className = 'locationItm'
    locationItm.style.backgroundImage = `url(${el.thumbnail_url})`
    locationContainer.appendChild(locationItm)
    let p = document.createElement("p")
    p.innerText = el.location_name
    let btn = document.createElement("p")
    btn.className = 'resBtn'
    btn.innerText = 'Reserve Court'
    locationItm.appendChild(p)
    locationItm.appendChild(btn)
    btn.addEventListener('click',(e) =>{
      // locationContainer.className = "hidden"
      // mapPicker.className = "hidden"
      // reservations.className = "reservations"
      let hidden = document.querySelectorAll("#main > div:not(#reservations)")
      hidden.forEach(el => {
        el.className = 'hidden'
      })
      reservations.className = 'reservations'
    })
  })     
}