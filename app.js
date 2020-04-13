const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const port = 3000;

app.use('/static', express.static('public'));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./index.html'));
})

app.get('/:id', function(req,res){
    res.sendFile(path.join(__dirname,'./'+req.params.id));
})
app.get('/getZipcode/:lng/:lat',(req,res)=>{
    const username = 'mspc';
    //http://api.geonames.org/findNearbyPostalCodesJSON?lat=40.789680&lng=-77.858063&username=mspc
    const Url = 'http://api.geonames.org/findNearbyPostalCodesJSON?lat='+req.params.lat+'&lng='+req.params.lng+'&username='+username;
    http.get(Url, (resp)=>{
        let data = '';
        resp.on('data', (chunk)=>{
            data+=chunk;
        });
        resp.on('end', () => {
            res.end(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });


})

app.listen(port, function(){
    console.log("Listening on port "+port);
})

