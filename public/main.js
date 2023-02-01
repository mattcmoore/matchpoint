// import {picker} from 'datepicker.js' 
//DOM
const login = document.querySelector("#login")
login.className = "hidden"
const home = document.querySelector("#home")
home.className = "home"
const locationContainer = document.querySelector("#locationContainer")
locationContainer.className = "locationContainer"
// const mapPicker = document.querySelector("#map-picker")
// mapPicker.className = "map-picker"
const reservations = document.querySelector("#reservations")
reservations.className = 'hidden'
const logo = document.querySelector("#logo") 
logo.addEventListener('click',(e) =>{
  buildHome() 
})
function buildHome(){
  let hidden = document.querySelectorAll("#main > div:not(#home)")
  hidden.forEach(el => {
    el.className = 'hidden'
  })
  home.className = 'home'  
  console.log('hidden')
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
login.addEventListener('click', (e) =>{  
  e.preventDefault()
  const req = {}
  req['username'] = document.getElementById("login-username").value
  req['password'] = document.getElementById("login-password").value
  const options = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(req)
  }
  fetch("/login", options)
  .then((res) => res.json())
  .then((data) => {
     console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
})

// fetch("/locations")
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
      let hidden = document.querySelectorAll("#main > div:not(#reservations)")
      hidden.forEach(el => {
        el.className = 'hidden'
      })
      reservations.className = 'reservations'
        buildReservation(el)
    })
    
  })

}
function buildReservation(loc){
  const thumb = document.querySelector("#reservations-thumb")
  const locationName = document.querySelector("#location-name")
  const rating = document.querySelector("#rating")
  const address = document.querySelector("#address")
  const open = document.querySelector("#open")
  const close = document.querySelector("#close")
  const str = loc.id.toString()
  console.log(`/locations/${str}`)
  fetch( `/locations/${str}`)
  .then((res) => res.json())
  .then((data) => {
    //  console.log('Success:', data);
    const obj = data[0]
    if(obj['location_name'] === "Cohassett Court"){
      locationName.innerText = obj['location_name'] 
    }else{
      locationName.innerText = obj['location_name']+" Volleyball Courts"  
    }
    thumb.style.backgroundImage = `url(${obj.thumbnail_url})`
    rating.innerText = obj['rating']
    address.innerText = obj['address']
    open.innerText = obj['open_time'].slice(0,-3)
    close.innerText = obj['close_time'].slice(0,-3)
  })
  .catch((error) => {
      console.error('Error:', error);
  })  
  // send a post request with the id doing a join with courts where courts.id = row.id
  // loop through the results and fill in the blanks

}
// SELECT * FROM courts INNER JOIN locations ON courts.location_id=locations.id WHERE location_id = 1;