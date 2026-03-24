const CaptainModel = require("../modles/coptain.model");
const {validationResult} = require("express-validator");
const captainService = require("../services/captain.service");
const BlacklistToken = require("../modles/blacklistToken.model")

module.exports.register = async (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {fullname,email,password,vehicle} = req.body;

    const isCaptainAlready = await CaptainModel.findOne({email});

    if(isCaptainAlready){
        return res.status(400).json({message:"Captain already exist"})
    }

    const hashpassword = await CaptainModel.hashpassword(password);

    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashpassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({token,captain})

}

module.exports.login = async (req,res,next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password} = req.body;
    const user = await CaptainModel.findOne({email}).select("+password");

    const isMatch = await user.comparePassword(password);

    console.log("isMatch",isMatch)

    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });

}

module.exports.getcaptainProfile = async (req,res,next) =>{
    return res.status(200).json(req.captain);
}

module.exports.logout = async (req,res,next)=>{

    res.clearCookie("token");

     var token = req.cookies.token || req.headers.authorization.split(" ")[1];
    
    await BlacklistToken.create({token});

    return res.status(200).json({message:"Logged out"});
}

