const router = require("express").Router();
const user = require("../model/user");
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation')
const bcryptjs = require('bcryptjs');

router.post('/register', async (req, res) => {
  
  const { error } = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const emailExist = await user.findOne({ email: req.body.email });
  if(emailExist) return res.status(400).send('Email is already exists');

  const hashing = await bcryptjs.genSalt(10);
  const hashPass = await bcryptjs.hash(req.body.password, hashing);
  
  const newUser = new user({
      name: req.body.name,
      email: req.body.email,
      password: hashPass
  });
  try{
      const savedUser = await newUser.save();
      res.send({ newUser: newUser._id });
  }catch(err){
      res.status(400).send(err);
  }
});


router.post('/login',async (req, res) => {

    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const userEmail = await user.findOne({ email: req.body.email });
    if(!userEmail) return res.status(400).send('Email is not found!');

    const validPass = await bcryptjs.compare(req.body.password, userEmail.password);
    if(!validPass) return res.status(400).send('Wrong Password!');

    const token = jwt.sign({ _id: userEmail._id }, process.env.TOKEN);
    res.header('auth-token', token).send(token);
});
module.exports = router;
