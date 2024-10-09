import express from 'express';
import Book from './models/book.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();


app.use(express.json());



const port =3000;
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(process.env.MONGO_URI);
  
  console.log('connect success')

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}





app.post('/book', (req, res) => {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        printNum: req.body.printNum,
        datePublish: req.body.datePublish,
        pdf: req.body.pdf,
        price: req.body.price,
        language: req.body.language,
        class: req.body.class
    });

    book.save()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.error('Error saving article:', error);
            res.status(500).send('Error saving article');
        });
}); 

app.get('/book', (req,res)=>{
    Book.find()
    .then(result=>{
        res.send(result)
    })
})
app.get('/book/:id', (req,res)=>{
    Book.findOne()
    .then(result=>{
        res.send(result)
    })
})  

app.patch('/update/:id', (req,res)=>{
    const {id} = req.params
    Book.findByIdAndUpdate(id ,req.body,{new:true, runValidators:true})
    .then((result)=>{
        res.send(result)
    })
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    Book.deleteOne({ _id: id }) 
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).send('Article not found'); 
            }
            res.send('Article deleted successfully');
        })
        .catch((error) => {
            console.error('Error deleting article:', error);
            res.status(500).send('Error deleting article');
        });
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})