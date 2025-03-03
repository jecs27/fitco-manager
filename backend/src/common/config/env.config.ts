export const envConfig = () => ({
  PORT: parseInt(process.env.PORT || '3027', 10),
  API_PREFIX: process.env.API_PREFIX || 'api',
	JWT_SECRET: process.env.JWT_SECRET || 'secretJWTExample',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '12h',
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT || '3306', 10),
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'root',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'root',
  DATABASE_NAME: process.env.DATABASE_NAME || 'mysql',
});
