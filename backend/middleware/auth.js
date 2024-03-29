const JWTservices = require('../services/JWTservices');
const User = require('../models/user')
const UserDTO = require('../dto/user')

const auth = async (req,res,next) =>{
    try {
         // refresh access token validation
    const {refreshToken, accessToken} = req.cookies;
    if(!refreshToken || !accessToken){
        const error = {
            status: 401,
            message: 'Unauthorized'
        }
        return next(error)
    }
        let _id;
    try {
        _id = JWTservices.verifyAccessToken(accessToken)._id;
        
    } catch (error) {
        return next(error)
    }

    let user;
    try {
        user = await User.find({_id: _id});  
    } catch (error) {
        return next(error)
    }
        const userDto = new UserDTO(user)

        req.user = userDto;
        next();
    } catch (error) {
        return next(error)
    }
   
}

module.exports = auth;