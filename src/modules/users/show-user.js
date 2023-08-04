import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const showUser = async ({ id }) => {
  const existing = await db("users").where({ id }).first();

  if (!existing) {
    throw new NotFoundError("User Not Found");
  }

  return existing;
};
