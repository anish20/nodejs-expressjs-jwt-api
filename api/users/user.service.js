const { v4 } = require('uuid');
const pool=require('../../config/db');
const {v4: uuidv4} =require('uuid');
module.exports={
    register:(data,callback)=>{
        //check email id if exist..
        pool.query("select * from users where email=?",[data.email],(err,rs)=>{
            if(rs.length>0){
                console.log(rs.length+": "+"Email alreddy exist");
                return callback(null,{result:'error',message:'email already exist',status:501})
            }else{
                let id=uuidv4();
                pool.query(`insert into users (id,fname,email,password) values(?,?,?,?)`,
                [id,data.fname,data.email,data.password],
                (error,result,fields)=>{
                    if(error){
                        return callback(error);
                    }
                    console.log("User register successfully...");
                    return callback(null,{result:'success',message:'User registration successfully!',status:200});
                });
                
            }
        });
        
    },

    login:(data,callback)=>{
        pool.query(`select * from users where email=?`,[data.email],
        (error,result,fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null,result);
        }
        )
    },
    getAllUsers:(callback)=>{
        pool.query(`select * from users`,
        (error,result,fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null,result);
        }
        )
    }
    
}