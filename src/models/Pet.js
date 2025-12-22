import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
specie: {
    type: String,
    required: true
},
age: {
    type: Number,
    required: true
}
});

export const PetModel = mongoose.model("Pet", petSchema);