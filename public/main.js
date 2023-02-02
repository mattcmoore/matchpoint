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
const timeTable = document.querySelector("#time-table")
timeTable.className = "hidden"
const timeTableContent = document.querySelector("#time-table-content")
const courtTable = document.querySelector("#court-table")
courtTable.className = "hidden"
timeTable.className = "hidden"
const datepicker = document.querySelector("#datepicker")
const reservationComplete = document.querySelector("#reservation-complete")
reservationComplete.className = "hidden"
const cancel = document.querySelector("#cancel")
cancel.className = 'hidden'
const logo = document.querySelector("#logo") 
logo.addEventListener('click',(e) =>{
  buildHome() 
})
function buildHome(){
  let hidden = document.querySelectorAll("#main > div:not(#home)")
  hidden.forEach(el => {
    el.className = 'hidden'
  })
  reservationComplete.className = "hidden"
  cancel.className = 'hidden'

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
    buildPicker(obj.open_time,obj.close_time,obj.id)
  })
  .catch((error) => {
      console.error('Error:', error);
  })  
  // send a post request with the id doing a join with courts where courts.id = row.id
  // loop through the results and fill in the blanks

}
// SELECT * FROM courts INNER JOIN locations ON courts.location_id=locations.id WHERE location_id = 1;
function buildPicker(open,close,id){
  $( function() {
    const picker = $( "#picker" ).datepicker({
        onSelect: function(date){
            let psqlDate = parseDate(date)
            $('#picker').hide()
            timeTable.className = 'time-table'
            let start = parseInt( open.slice(0,2) )
            let end = parseInt( close.slice(0,2) )
            for (var i = start; i < end; i += 2) {
              let timeBtn = document.createElement("p")
              timeBtn.className = 'time-btn'
              //fix with moment
              timeBtn.innerText = i.toString()+":00"
              timeTableContent.append(timeBtn)
              const reservation_data = {
                'date':psqlDate,
                'location_id':id.toString()
              }
              timeBtn.addEventListener('click',(e) =>{
                reservation_data['time'] = e.path[0].innerText
                const options = {
                  method: 'POST',
                  headers: {
                    'Content-Type':'application/json'
                  },
                  body: JSON.stringify(reservation_data)
                }
                fetch("/courts", options)
                .then((res) => res.json())
                .then((data) => {
                  console.log('Success:', data);
                    buildCourts(data,reservation_data)
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  })
              })
            }
        }
    })
function parseDate(date){
      let year = date.slice(-4)
      let month = date.slice(3,5)
      let day = date.slice(0,2)
      return `${year}-${month}-${day}`
  }  
})
}
function buildCourts(obj,reservation_obj){
  const courtTableContent = document.querySelector("#court-table-content")
  console.log(reservation_obj)
  obj.rows.forEach(el =>{
    let courtName = el.court_name
    let id = el.id.toString()
    let courtBtn = document.createElement("p")
    courtBtn.className = 'court-btn'
    courtBtn.innerText = el.court_name
    courtTableContent.append(courtBtn)
    timeTable.className = "hidden"
    courtTable.className = "court-table"
    courtBtn.addEventListener("click",()=>{
      createReservation(id,reservation_obj)
    })
  })
}
function createReservation(court_id,reservation){ 
  let data = {
    'court_id': court_id,
    'user_id':1, //hard coded bc why not
    'date': reservation.date,
    'time': reservation.time+":00"
  }
  console.log(data)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  }
  fetch("/reservations", options)
    .then((res) => res.json())
    .then((data) => {
      console.log('Success:', data);
      buildSucess(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      })
}

function buildSucess(obj){
  // console.log(obj)
  let id = obj.rows[0].id
  let p = document.createElement("p")
  let name = obj.rows[0].location_name
  p.innerText = `Success, you reserved court ${id} at ${name}`
  reservationComplete.prepend(p)
  reservations.className = "hidden"  
  reservationComplete.className = ".reservationComplete"
  cancel.className = "cancel"
}