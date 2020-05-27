
module.exports = {
 
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_DATABASE || 'launchstoredb',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  port: process.env.DB_PORT ||'15432'

}
