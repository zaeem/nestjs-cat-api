import { MigrationInterface, QueryRunner } from "typeorm";

export class Dbsetup1712690684044 implements MigrationInterface {
  name = "Dbsetup1712690684044";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."User_role_enum" AS ENUM('admin', 'user')`,
    );
    await queryRunner.query(
      `CREATE TABLE "User" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text, "role" "public"."User_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "index_user_email" ON "User" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "Cat" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_09b9d79f55148010f240d6d9a35" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "UserCats" ("id" SERIAL NOT NULL, "userId" integer, "catId" integer, CONSTRAINT "PK_40378958b53044b4f2939f1c640" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserCats" ADD CONSTRAINT "FK_0154029409459bc5aeffd5677cd" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserCats" ADD CONSTRAINT "FK_bd7b4ea07a82971cc0c55f52ad1" FOREIGN KEY ("catId") REFERENCES "Cat"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "UserCats" DROP CONSTRAINT "FK_bd7b4ea07a82971cc0c55f52ad1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "UserCats" DROP CONSTRAINT "FK_0154029409459bc5aeffd5677cd"`,
    );
    await queryRunner.query(`DROP TABLE "UserCats"`);
    await queryRunner.query(`DROP TABLE "Cat"`);
    await queryRunner.query(`DROP INDEX "public"."index_user_email"`);
    await queryRunner.query(`DROP TABLE "User"`);
    await queryRunner.query(`DROP TYPE "public"."User_role_enum"`);
  }
}
