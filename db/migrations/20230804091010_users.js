/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.enum("role", ["super_admin", "admin", "user"]).notNullable();
    table.boolean("is_deleted").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("users");
};
