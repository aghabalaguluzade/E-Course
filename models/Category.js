import mongoose from "mongoose";
import slugify from "slugify";
const {Schema} = mongoose;

const categoryShema = new Schema({
     name : {
          type : String,
          unique : true,
          required : true
     },
     slug : {
          type : String, 
          unique : true
     }
});

categoryShema.pre("validate", function(next) {
     this.slug = slugify(this.name, {
          lower : true,
          strict : true
     });
     next();
});

const Category = mongoose.model('Category', categoryShema);

export default Category;