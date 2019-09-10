require('dotenv').config();

export default {
  client: process.env.DB_CLIENT || 'mysql',
  connection: {
    host: process.env.DB_HOST || 'sql10.freemysqlhosting.net',
    user: process.env.DB_USER || 'sql10304731',
    password: process.env.DB_PASSWORD || 'hMseRutHqp',
    database: process.env.DB_NAME || 'sql10304731',
    charset: 'utf8mb4',
    // socketPath: process.env.SOCKET_PATH,
  },
  debug: true,
};
