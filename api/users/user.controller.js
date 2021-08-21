const {register,login ,getAllUsers}=require('../users/user.service');
const {genSaltSync,hashSync,compareSync }=require('bcrypt');
const {sign}=require('jsonwebtoken');
let jwt=null;
module.exports={
    createUsers:(req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt);
        register(body,(error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).send({
                     result:'error',
                     message:'Database connection error',
                     status:400
                })
            }
            return res.status(200).send(result);
        })
    },
    loginUser:(req,res)=>{
        const body=req.body;
        login(body,(error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).send({
                     result:'error',
                     message:'Database connection error',
                     status:400
                })
            }
           
            if(result!=null && result.length==0){
                console.log("Sorry email is incorrect");
                return res.status(404).send({
                    result:'error',
                    message:'Sorry email is incorrect',
                    status:404
               })
            }else{
                const rst=compareSync(body.password,result[0].password);
                if(rst==false){
                    console.log("Sorry Password incorrect");
                            result.password=undefined;
                            return res.status(500).send({
                                result:'error',
                                message:'Sorry Password incorrect',
                                status:404
                               }); 
                    }else{
                        console.log("Login Successfully");
                        return res.status(200).send({
                                    token:sign({ result:result },process.env.SECRET_KEY,{expiresIn:'1h'}),
                                    user:result[0]
                                })
                    }
            }

        });
    },
    users:(req,res)=>{
        getAllUsers((error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).send({
                     result:'error',
                     message:'Database connection error',
                     status:400
                })
            }
            console.log("Get All Users");
            return res.status(200).send({
                data:result
            })
        })
    }

}
