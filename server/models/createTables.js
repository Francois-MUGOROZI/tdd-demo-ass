const { pool } = require('../config/db_config');

const tablesCreator = `
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(35) UNIQUE NOT NULL,
  firstName VARCHAR(21) NOT NULL,
  lastName VARCHAR(22) NOT NULL,
  password VARCHAR(300) NOT NULL 
);

CREATE TABLE IF NOT EXISTS contacts(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(200) NOT NULL,
  description VARCHAR(500),
  owner_email VARCHAR(200),
  phone_number VARCHAR(30),
  created_on TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`;

const tables = async () => {
  await pool
    .query(tablesCreator)
    .then(() => {
      console.log('Tables Created');
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      process.exit(0);
    });
};

tables();
