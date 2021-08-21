const {verify}=require('jsonwebtoken');

module.exports={
    checkToken:(req,res,next)=>{
        let token =req.get("authorization");
        if(token){
            token=token.slice(7);
            verify(token,process.env.SECRET_KEY,(error,decoded)=>{
                if(error){
                    console.log("Invalid Token");
                    res.json({
                        result:'error',
                        message:'Invalid Token'
                    })
                }else{
                    next();
                }
            })
        }else{
            console.log("Access Denied unauthorized user");
            res.json({
                result:'error',
                message:'Access Denied unauthorized user'
            });
        }
    }
}