const User = require("../models/User");
const jwt = require('jsonwebtoken');


const getUser = async (req, res, next) => {
    try{
        let user = await User.findOne({name: req.body.name, number: req.body.number});
        if(user != null){
            const userObject = user.toJSON();
            if(userObject.authorized == "false"){
                try{
                    await User.updateOne({name: userObject.name, number: userObject.number},{authorized: "true"}).then(result => {
                        const payload = {
                            name: userObject.name,
                            number: userObject.number,
                          };
                        const secretKey = "secretOrPrivateKey must have a value";
                        const token = jwt.sign(payload, secretKey);
                        res.json({token});
                      })
                      .catch(error => {
                        console.log(error);
                      });
                } catch (err) {
                    console.log(err);
                }
            }
            else{
                res.json({message: "User already authorized", exists: "true"});
            }
        }
        else{
            res.json({exists: false});
        }
    }catch (err) {
        return next(err);
    };
}


exports.getUser = getUser;
