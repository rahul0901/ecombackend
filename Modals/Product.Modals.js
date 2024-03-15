import mongoose, { Schema } from "mongoose";

const product = new Schema({
    pname: String,
    pprice: Number,
    pdescription: String,
    pimages: [String],
    pcategory: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData'
    }
});

export default mongoose.model('ProductData', product);