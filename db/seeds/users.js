import bcryptjs from "bcryptjs";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      first_name: "super-admin",
      last_name: "super-admin",
      username: "super-admin",
      password: bcryptjs.hashSync("superadmin1234", 10),
      role: "super_admin",
    },
    {
      first_name: "admin",
      last_name: "admin",
      username: "admin",
      password: bcryptjs.hashSync("admin1234", 10),
      role: "admin",
    },
  ]);
};
