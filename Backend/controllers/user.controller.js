const res = require("express/lib/response");
const  userModel = require("../modles/user.modle");
const userService = require("../services/user.service");
const {validationResult} = require("express-validator");
const BlacklistToken = require("../modles/blacklistToken.model")


module.exports.register = async (req,res,next)=>{

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {fullname,email,password} = req.body;

    var isUserAlready = await userModel.findOne({email});

    if(isUserAlready){
        return res.status(400).json({"mesaage":"User already exist"})
    }

    console.log(req.body)

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword
    })

    const token = user.generateAuthToken();

    res.status(201).json({token,user})

}

module.exports.login = async (req,res,next) =>{

    const errors = validationResult(req);

     if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password} = req.body;

    var user = await userModel.findOne({email}).select('+password');

     if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });

}

module.exports.getUserProfile = async (req,res,next)=>{
    return res.status(200).json(req.user);
}

module.exports.logout = async (req,res,next) =>{

    res.clearCookie("token");

    var token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await BlacklistToken.create({token});

    res.status(200).json({message:"Logged out"})

}