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
            const rst=compareSync(body.password,result[0].password);
            console.log('Password matching result :',rst);
            if(rst==false){
                result.password=undefined;
                return res.status(500).send({
                    result:'error',
                    message:'Sorry Password incorrect',
                    status:404
               });
                
            }else{
            return res.status(200).send({
                token:sign({ result:result },'SECRETKEY',{expiresIn:'1h'}),
                user:result[0]
            })
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
            return res.status(200).send({
                data:result
            })
        })
    }

}
