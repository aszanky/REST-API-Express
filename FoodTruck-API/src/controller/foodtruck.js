// This is a controller
// The Controller is responsible for controlling the application logic and acts as 
// the coordinator between the View and the Model. The Controller receives an input 
// from the users via the View, then processes the user's data with the help of 
// Model and passes the results back to the View.

import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';
import Review from '../model/review';

export default({config, db}) => {
    let api = Router();

    // CRUD

    // '/v1/foodTruck/add
    api.post('/add', (req, res) => {
        let newFoodTruck = new FoodTruck();
        newFoodTruck.name = req.body.name;
        newFoodTruck.foodtype = req.body.foodtype;
        newFoodTruck.avgcost = req.body.avgcost;
        newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;

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

    // 'v1/foodtruck/reviews/add/:id' - POST
    api.post('/reviews/add/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if(err) {
                res.send(err);
            }
            let newReview = new Review();
            newReview.title = req.body.title;
            newReview.text = req.body.text;
            newReview.foodtruck = foodtruck._id;
            newReview.save((err, review) => {
                if(err) {
                    res.send(err);
                }
                foodtruck.reviews.push(newReview);
                foodtruck.save(err => {
                    if(err) {
                        res.send(err);
                    }
                    res.json({message: 'Food Truck review saved!'});
                })
            })
        })
    })

    // get reviews for a spesific foodtruck id
    // '/v1/foodtruck/reviews/:id'
    api.get('/reviews/:id', (req, res) => {
        Review.find({foodtruck: req.params.id}, (err, reviews) => {
            if (err) {
                res.send(err);
            }
            res.json(reviews);
        })

    })

    return api;
}