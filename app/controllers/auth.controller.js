
const Jwt = require('jsonwebtoken');
const db = require("../models");
const bcrypt = require('bcrypt');


// import { CustomError, MongoError } from '../exceptions.js';

exports.authentication = function (req, res) {
    //    console.log(req.body)
    if (req.body.auth_type === 'password') {
        passwordAuth(req, res);
    } 
   
};

async function passwordAuth(req, res) {

    try {

        const savedPw = await db.user.findOne({ where: {username:req.body.user.username}, raw:true});
  

        if (savedPw) {
            
            const isPasswordTrue = bcrypt.compareSync(req.body.user.password, savedPw.password)
           
            if (isPasswordTrue) {

                // if (!savedPw.isValid) {
                //     res.status(406).send({success:false, message:'user has removed the account'});
                // } else {

                    const _user = {
                        id: savedPw.user_id,
                        username: savedPw.username,
                        role:savedPw.role
                    };
            
                    const accessToken = Jwt.sign(_user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5h" });
                    const refreshToken = Jwt.sign(_user, process.env.REFRESH_TOKEN_SECRET);
                    res.send({
                        success:true, 
                        payload :{
                            token_type:'bearer', 
                            access_token:accessToken, 
                            expires_in: '5h', 
                            refresh_token:refreshToken,
                            user:_user
                        }
                    });
                    
                // }
   
    
            } else {
                res.status(402).send({msg:'email or password was wrong.!'});
            }
        } else {
            res.status(400).send({msg:'This user does not exist.!'});
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({msg:'internal server error'});
    }

   
};

exports.refreshToken = function (req, res) {

    const accessToken = Jwt.sign(_user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "900s" });
    const refreshToken = Jwt.sign(_user, process.env.REFRESH_TOKEN_SECRET);
    res.send({success:true,
         payload :{token_type:'bearer', access_token:accessToken,
          expires_in: '18000s', refresh_token:refreshToken}});

};


