import {createPool} from "mysql2/promise";
import { configDotenv } from 'dotenv';
configDotenv();

const client = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

async function testDb() {
    const data = await client.execute('SELECT * FROM users')
    .then(data => console.log(data));   

}
testDb();