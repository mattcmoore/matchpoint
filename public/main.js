// async fetchLocations(){
//   const response = await fetch("/locations")
//   const locations = await response.json()
//   console.log("location data", locations)
// }
const reservations = document.querySelector("#reservations")
// reservations.className = "reservations-click"
const locationContainer = document.querySelector("#locationContainer")
locationContainer.className = "locationContainer"
const mapPicker = document.querySelector("#map-picker")
mapPicker.className = "map-picker"
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
      locationContainer.className = "locationContainer-click"
      mapPicker.className = "mapPicker-click"
      reservations.className = "reservations"

    })
  })     
}