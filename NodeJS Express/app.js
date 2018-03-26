const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let Vehicle = require('./app/models/vehicle');

// Configure app for bodyParser
// lets us grab data from the body of POST

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up port for server to listen on
const port = process.env.PORT || 3000;

// Connect to DB using mongoose
mongoose.connect('mongodb://localhost:27017/codealong');

// API Routes
const router = express.Router();

// Routes will all be prefixed with /api
app.use('/api', router);

// MIDDLEWARE can be very useful for doing validation. We can log
// things from here or stop the request from continuing in the event
// that the request is not safe.
// middleware to use for all requests
// Middleware functions can perform the following tasks:
// Execute any code.
// Make changes to the request and the response objects.
// End the request-response cycle.
// Call the next middleware function in the stack.

router.use((req, res, next) => {
    console.log('FYI... There is some processing currently going down');
    next();
})

// Test Routes
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our API!'
    });
});

router.route('/vehicles')

    .post((req, res) => {
        let vehicle = new Vehicle();    // Create new instance from vehicle
        vehicle.make = req.body.make;
        vehicle.model = req.body.model;
        vehicle.color = req.body.color;

        vehicle.save((err) => {
            if(err) {
                res.send(err);
            }
            res.json({
                message: 'The Vehicle was successfully manufactured'
            });
        });
    })

    .get((req, res) => {
        Vehicle.find((err, vehicles) => {
            if (err) {
                res.send(err);
            }
            res.json(vehicles);
        });
    });

router.route('/vehicle/:vehicle_id')
    .get((req, res) => {
        Vehicle.findById(req.params.vehicle_id, (err, vehicle) => {
            if(err) {
                res.send(err);
            }
            res.json(vehicle);
        })
    });

router.route('/vehicle/make/:make')
    .get((req, res) => {
        Vehicle.find({make: req.params.make}, (err, vehicle) => {
            if(err) {
                res.send(err);
            }
            res.json(vehicle);
        });
    });

router.route('/vehicle/color/:color')
    .get((req, res) => {
        Vehicle.find({color: req.params.color}, (err, vehicle) => {
            if(err) {
                res.send(err);
            }
            res.json(vehicle);
        });
    });

// Fire up our server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})