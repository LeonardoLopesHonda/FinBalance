import { Client } from "pg";

async function query(queryObject) {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        ssl: getSSLValue()
    });

    try {
        await client.connect();
        const result = await client.query(queryObject);
        return result;
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        await client.end();
    }

    function getSSLValue() {
        if (process.env.POSTGRES_CA) {
            return {
                ca: process.env.POSTGRES_CA,
            };
        }
        return process.env.NODE_ENV === "production" ? true : false
    }
}

export default {
    query: query
}