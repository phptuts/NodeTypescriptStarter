import { createConnection } from 'typeorm';
import { User } from '../entities/user.entity';

export const connectdb = async () => {
  console.log(
    process.env.DB_SYNC,
    'root',
    'root',
    process.env.DB_DATABASE,
    process.env.DB_SYNC === 'true'
  );
  return await createConnection({
    type: 'mysql',
    host: process.env.DB_URL,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User],
    synchronize: process.env.DB_SYNC === 'true',
  });
};
