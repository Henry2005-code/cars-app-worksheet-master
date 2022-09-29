
/** Reference code: https://github.com/bpeddapudi/nodejs-basics-routes/blob/master/server.js 
 * import express */
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// To support cors. 
app.use(cors())

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());



let carsMockData = [
    {
        "id": 1,
        "brand": "Hyundai",
        "name": "Ioniq",
        "releaseYear": 2017,
        "color": "blue"
    },
    {
        "id": 2,
        "brand": "Toyota",
        "name": "Prius",
        "releaseYear": 2007,
        "color": "blue"
    },
    {
        "id": 3,
        "brand": "Chevrolet",
        "name": "Aveo",
        "releaseYear": 2007,
        "color": "white"
    },
    {
        "id": 4,
        "brand": "BMW",
        "name": "M5",
        "releaseYear": 2017,
        "color": "White"
    },
    {
        "id": 5,
        "brand": "Tesla",
        "name": "S",
        "releaseYear": 2019,
        "color": "Black"
    }
]

/** Create GET API. API shoudl return  const carsMockData*/

app.get("/list", (req, res) => {
    res.send(carsMockData)
})



/** Create POST API. Get the new car data from react. 
 *      Check if car with id exists. If Yes return 500. With message 'Car already exists'
 *      If there is no car with the id, add the new car to  carsMockData and return carsMockData as response */

 app.post("/save", (req, res) => {
    let carWithId = carsMockData.some(car => car.id === parseInt(req.body.id))

    if(carWithId){
        res.status(500).send("Car already exists")
    }
    else{
        let id = parseInt(req.body.id);
        let brand = req.body.brand;
        let name = req.body.name;
        let releaseYear = req.body.releaseYear;
        let color = req.body.color;
        carsMockData.push({"id":id, "brand":brand, "name":name, "releaseYear": releaseYear, "color": color});
        res.send(carsMockData);
    }
})



/** Create PUT API. 
 *  Check if car with id exists. If No return 500 with error 'No car with given id exist'. 
 *  If there is car with the requested id, update that car's data in 'carsMockData' and return 'carsMockData' */

 app.put("/edit", (req,res) => {
    let CarWithId = carsMockData.some(car => car.id === parseInt(req.body.id))
    if(CarWithId){
        let id = parseInt(req.body.id);
        let brand = req.body.brand;
        let name = req.body.name;
        let releaseYear = req.body.releaseYear;
        let color = req.body.color;
        carsMockData.push({"id":id, "brand":brand, "name":name, "releaseYear": releaseYear, "color": color});
        res.send(carsMockData);
    }
    else{
        res.status(500).send('No car with given id exist')
    }
})


/** Create Delete API. 
 *  Check if car with id exists. If No return 500. With message 'No car with give id exists'
 *  If there is car with the requested id. Delete that car from 'carsMockData' and return 'carsMockData'
*/

app.delete("/delete", (req, res) => {
    let carWithId = carsMockData.some(car => car.id === parseInt(req.body.id))

    if(carWithId){
        carsMockData = carsMockData.filter((car) => car.id !== req.body.id) 
        res.send(carsMockData);
    }
    else{
        res.status(500).send('No car with give id exists')
    }
})

app.listen(8000);