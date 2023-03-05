
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
	checkEmail = async (email , password)=>{
		let sql = `SELECT * FROM  user_Registration WHERE email = '${email}' And password='${password}' `;
		const [result, fields] = await promisePool.query(sql);
        return result;

	}
	// checkPassword = async (email)=>{
	// 	let sql = `SELECT password FROM  user_Registration WHERE email = '${email}'`;
	// 	const [result, fields] = await promisePool.query(sql);
	// 	return result;

	// }
	chatRegister= async (data)=>{
		let sql =`INSERT INTO chat (sender,Receiver,content) values ('${data.sender}','${data.Receiver}','${data.content}')`
		const[result,fields] = await promisePool.query(sql);
		return result;
	}
	getAllDetails= async()=>{
		let sql = `SELECT chat.sender, chat.Receiver, chat.content,u.name AS Recipient,user_Registration.name AS senderName, chat.Created_At  
		FROM chat 
		JOIN user_Registration ON chat.sender = user_Registration.id 
		 left JOIN user_Registration AS u ON chat.Receiver = u.id`
		const[result,fields] = await promisePool.query(sql);
		return result;
	}
	checkUserById= async (id)=>{
		let sql = `select * from user_Registration where id ='${id}'`;
		const[ result,fields]= await promisePool.query(sql);
		return result
	}
}


 module.exports=new userModel;