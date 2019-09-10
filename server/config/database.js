require('dotenv').config();

export default {
  client: process.env.DB_CLIENT || 'mysql',
  connection: {
    host: process.env.DB_HOST || 'sql3.freemysqlhosting.net',
    user: process.env.DB_USER || 'sql9304683',
    password: process.env.DB_PASSWORD || 'VHifcpUgUT',
    database: process.env.DB_NAME || 'sql3206184',
    charset: 'utf8mb4',
    // socketPath: process.env.SOCKET_PATH,
  },
  debug: true,
};
