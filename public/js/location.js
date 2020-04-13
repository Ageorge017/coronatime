$(document).ready(function(){
    getLocation();
});

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getZipcode, Err);
    }
    else{
        console.log("Geolocation not supported");
    }
}
function getZipcode(position){
    console.log(position);
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    const requestUrl = '/getZipcode/'+longitude+'/'+latitude;
    $.ajax({
        url: requestUrl,
        method: "GET",
        dataType: "json",
        success: function(data){
            console.log(data.postalCodes[0]);
            const zipcode = data.postalCodes[0].postalCode;
            searchServicesByZipcode(zipcode);
        }
    })

}
function searchServicesByZipcode(zipcode){
    //TODO: send zipcode to prasanth's monstrasity 
    console.log(zipcode);
}
function Err(error){
    switch(error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.")
          break;
      }
}