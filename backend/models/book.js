import mongoose from "mongoose";
const {Schema} = mongoose;


const bookSchema = new Schema({
    name: String,
    author:String,
    printNum: Number,
    datePublish: String,
    pdf: Boolean,
    price: Number,
    language: String,
    class:String
},
{timestamps:true}
);

const Book = mongoose.model('Book', bookSchema);

export default Book;