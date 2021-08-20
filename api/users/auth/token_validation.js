const {verify}=require('jsonwebtoken');

module.exports={
    checkToken:(req,res,next)=>{
        let token =req.get("authorization");
        if(token){
            token=token.slice(7);
            verify(token,"SECRETKEY",(error,decoded)=>{
                if(error){
                    res.json({
                        result:'error',
                        message:'Invalid Token'
                    })
                }else{
                    next();
                }
            })
        }else{
            res.json({
                result:'error',
                message:'Access Denied unauthorized user'
            });
        }
    }
}