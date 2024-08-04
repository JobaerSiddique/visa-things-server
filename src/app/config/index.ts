import * as dotenv from 'dotenv'
dotenv.config()


export default{
    port : process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    NODE_ENV:process.env.NODE_ENV,
    jwt_refresh_secret:process.env.jwt_refresh_secret,
    jwt_access_secret: process.env.jwt_access_secret,
    jwt_access_expires_in:process.env.jwt_access_expires_in,
    jwt_refresh_expires_in:process.env.jwt_refresh_expires_in,
    
}