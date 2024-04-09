import { registerAs } from "@nestjs/config";

const DatabaseConfig = registerAs("database", () => {
  return {
    host: process.env.DATABASE_DOCKER_HOST ?? process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    type: process.env.DATABASE_TYPE as "postgres",
  };
});
const JwtConfig = registerAs("jwtConfig", () => ({
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  signOptions: { expiresIn: "24h" },
}));

export default [DatabaseConfig, JwtConfig];
