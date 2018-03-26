// This is a controller
// The Controller is responsible for controlling the application logic and acts as 
// the coordinator between the View and the Model. The Controller receives an input 
// from the users via the View, then processes the user's data with the help of 
// Model and passes the results back to the View.

import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../model/restaurant';

export default({config, db}) => {
    let api = Router();

    // CRUD

    // '/v1/restaurant/add
    api.post('/add', (req, res) => {
        let newRest = new Restaurant();
        newRest.name = req.body.name;
        
        newRest.save(err => {
            if(err) {
                res.send(err);
            }
            res.json({ message: 'Restaurant saved successfully'});
        });
    });

    // path '/v1/restaurant' - READ
    api.get('/', (req, res) => {
        Restaurant.find({}, (err, restaurant) => {
            if(err) {
                res.send(err);
            }
            res.json(restaurant);
        });
    });

    return api;
}