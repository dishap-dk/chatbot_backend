
const config = require('../config');
const mysql = require('mysql2');
const { database } = require('../config');
const pool = mysql.createPool(
	{
		host: config.mysqlHost,
		user: config.user,
		password: process.env.DB_PASS || config.password,
		database: config.database,
		port: config.mysqlPort
	});

const promisePool = pool.promise();

class userModel {

    registration= async(data)=>{
        let sql = `INSERT INTO user_Registration(name,email,password,city) VALUES ('${data.name}','${data.email}','${data.password}','${data.city}')`
        const [result, fields] = await promisePool.query(sql);
		return result;


    }
	checkEmail = async (email)=>{
		let sql = `SELECT email FROM  user_Registration WHERE email = '${email}'`;
		const [result, fields] = await promisePool.query(sql);

		return result;

	}
	checkPassword = async (email)=>{
		let sql = `SELECT password FROM  user_Registration WHERE email = '${email}'`;
		const [result, fields] = await promisePool.query(sql);
		return result;

	}
	chatRegister= async (data)=>{
		let sql =`INSERT INTO chat (description) values ('${data}')`
		const[result,fields] = await promisePool.query(sql);
		return result;
	}
	getAllDetails= async()=>{
		let sql = `SELECT * FROM user_Registration`
		const[result,fields] = await promisePool.query(sql);
		return result;
	}
}


 module.exports=new userModel;