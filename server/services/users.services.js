const UserModel = require('../model/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


class UserServices{
    async register(req, res){
        try{
            const {username, email, password } = req.body;
            
            const hashedPass = await bcrypt.hash(password, 10);

            const user = await UserModel.create({
                username: username,
                email: email,
                password: hashedPass
            });
            
            return res.status(201).json({
                sucess:true,
                body: user
            });
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: 'User creation failed'
            });
        }
    }

    async login(req, res){
        try{

            const { username, password } = req.body;
            
            console.log(req.body);
            console.log(username);

            const user = await UserModel.findOne({
                username
            });
            
            if(!user){
                return res.status(404).json({
                    success: 'false',
                    message: 'User not found'
                });
            }

            //verify hashedpass using bcrypt
            const passmatch = await bcrypt.compare(password, user.password);

            if(!passmatch){
                return res.status(401).json({
                    message: 'Invalid credentials'
                })
            }

            console.log('pass matched');

            //add the token 
            const token = jwt.sign(
                { 
                    user: user,
                },
                process.env.JSON_WEB_SECRET,
                {
                    expiresIn: '1h'
                }
            );

            res.cookie('token_task', token,{
                httpOnly: true
            });

            res.send(user);
        }
        catch(err){
            res.status(500).json({
                message: 'Id or credentials dont match'
            });
        }

    }

}

module.exports = new UserServices();