// This is a controller
// The Controller is responsible for controlling the application logic and acts as 
// the coordinator between the View and the Model. The Controller receives an input 
// from the users via the View, then processes the user's data with the help of 
// Model and passes the results back to the View.

import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodTruck';

export default({config, db}) => {
    let api = Router();

    // CRUD

    // '/v1/foodTruck/add
    api.post('/add', (req, res) => {
        let newFoodTruck = new FoodTruck();
        newFoodTruck.name = req.body.name;
        
        newFoodTruck.save(err => {
            if(err) {
                res.send(err);
            }
            res.json({ message: 'FoodTruck saved successfully'});
        });
    });

    // path '/v1/foodTruck' - READ
    api.get('/', (req, res) => {
        FoodTruck.find({}, (err, foodTruck) => {
            if(err) {
                res.send(err);
            }
            res.json(foodTruck);
        });
    });

    // 'v1/foodTruck/:id' - READ 1
    api.get('/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodTruck) => {
            if(err) {
                res.send(err);
            }
            res.json(foodTruck);
        });
    });

    // 'v1/foodTruck/:id' - UPDATE
    api.put('/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodTruck) => {
            if (err) {
                res.send(err);
            }
            foodTruck.name = req.body.name;
            foodTruck.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({message : "FoodTruck info updated"});
            });
        });
    });

    // 'v1/foodTruck/:id' - DELETE

    api.delete('/:id', (req, res) => {
        FoodTruck.remove({
            _id: req.params.id
        }, (err, foodTruck) => {
            if(err) {
                res.send(err);
            }
            res.json({message: "FoodTruck successfully removed"});
        });
    });

    return api;
}