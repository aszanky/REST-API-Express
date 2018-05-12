import mongoose, { model } from 'mongoose';

const Schema = mongoose.Schema;

let contactSchema = new Schema({
   firstName: {
       type: String,
       required: 'Enter a First Name'
   } ,
   lastName: {
       type: String,
       required: 'Enter a Last Name'
   },
   email: String,
   company: String,
   phone: Number,
   created_date: {
       type: Date,
       default: Date.now
   }
});

module.exports = mongoose.model('Contacts', contactSchema);