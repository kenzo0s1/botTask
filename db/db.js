import pkg from 'pg';
import {test} from "./scheme/user.js";
import dotenv from "dotenv";
const {Client} = pkg;

dotenv.config({path:'db/.dbSettings'});

export class DataBase {
    constructor() {
        this.client = new Client({
            user: process.env.user,
            host: process.env.host,
            database: process.env.database,
            password: process.env.password,
            port: process.env.port,
        })
        try{
            this.client.connect()
        }catch (e) {
            console.log(e)
        }
    }
    createSchemeUser(){
        this.client.query(test, (err, res) => {
            console.log(res)
        })
    }
    newUser(userId,name){
        let userQuery = `INSERT INTO "user" (userid ,  name) VALUES ('${userId}' , '${name}');`
        this.client.query(userQuery, (err, res) => {
            console.log(res)
        })
    }
     async selectAll() {
        let query = 'SELECT * FROM "user"\n' +
            'ORDER BY id ASC '
         return await this.client.query(query)
    }
}


