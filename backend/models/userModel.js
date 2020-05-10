
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    
    },
    email: {
      type: String,
    
    },
    dob: {
      type: String,
    }, 
    gender: {
      type: String,
    }, 
    
    image: {
      type: String,
    }, 

  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);


module.exports = mongoose.model("User", userSchema);
