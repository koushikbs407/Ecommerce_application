const { string } = require("joi");
const mongoose = require("mongoose");
const uri = "mongodb+srv://koushikbs:koushik%40407@cluster1.2xhj5.mongodb.net/mongodemoproject?retryWrites=true&w=majority&appName=Cluster1";
const Joi = require("joi");

  mongoose.connect(uri)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


    const category =  new mongoose.Schema({
        name:{
            type:String,
            required:true,
            unique:true,
            minlength:3,
            maxlength:50
        }
    });
    const Category = mongoose.model("Category",category);


    function validateCategory(category){
        const schema = Joi.object({
            name:Joi.string().min(3).required()
        });
        return schema.validate(category);
    };


module.exports={
    Category,
    validateCategory

};