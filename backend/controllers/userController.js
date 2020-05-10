const bcrypt = require("bcryptjs");


const User = require("../models/userModel");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const cpUpload = upload.fields([{ name: 'image', maxCount: 1 }])

const salt = bcrypt.genSaltSync(10);

exports.saveUser = (async (req, res) => {
  try {
    // encrypt password
    const { password } = req.body;
    const encodePassword = bcrypt.hashSync(password, salt);
    req.body.password = encodePassword;

    const result = await User(req.body).save(); // save result
    if (result) {
      return res.status(201).json({
        message: "User Created",
        status: "Success",
      });
    }
    else{
      return res.status(409).json({
      message: "Duplicate Email",
      status: "failure",
    });
  }
  } catch (err) {
    console.log("err", err.message);
    return res.status(501).json({
      message: err.message,
      status: "Failure",
    });
  }
});


exports.loginUser = (async (req, res) => {
  try {
    console.log('req', req.body)
    const { email, password } = req.body;
    // const user = new UserModel();

    const result = await User.find({ email });
    if (result) {
      const { password: hashDbPassword } = result[0];

      const check = bcrypt.compareSync(password, hashDbPassword); // true
      if (check) {
        const { firstName } = result[0];
        
        return res.status(200).json({
          message: "User Login SuccessFully",
          status: "Success",
          data: {
            result: result[0],
          },

        });
      }
      else{
        return res.status(401).json({
          message: "Invalid password",
          status: "Failure",
        });
      }
    }else{
      return res.status(404).json({
        message: "Data not found",
        status: "Failure",
      });
    }
   
  } catch (err) {
    console.log("err", err.message);
    return res.status(501).json({
      message: err.message,
      status: "Failure",
    });
  }
});

exports.list = (async (req, res) => {
  try {
    
    const result = await User.find({}, {password:0}); // save result
    if (result) {
      return res.status(200).json({
        message: "Data Found",
        status: "Success",
        data: result
      });
    }
    else{
      return res.status(409).json({
      message: "No Data Found",
      status: "failure",
    });
  }
  } catch (err) {
    console.log("err", err.message);
    return res.status(501).json({
      message: err.message,
      status: "Failure",
    });
  }
});