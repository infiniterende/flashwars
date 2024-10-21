"use server";

import { ID, Query } from "node-appwrite";

import { users, account } from "../appwrite.config";
import { parseStringify } from "../utils";

export interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

export interface LoginParams {
  email: string;
  password: string;
}
export const createAccount = async (user: CreateUserParams) => {
  try {
    const newAccount = await account.create(
      ID.unique(), // userId
      user.email, // email
      user.password, // password
      user.name // name (optional)
    );

    return parseStringify(newAccount);
  } catch (error: unknown) {
    // Check existing user
    const existingUser = await users.list([Query.equal("email", [user.email])]);
    return existingUser.users[0];

    console.error("An error occurred while creating a new user:", error);
  }
};

export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newUser = await users.create(
      ID.unique(),
      user.email,
      undefined,
      user.password,
      user.name
    );

    return parseStringify(newUser);
  } catch (error: unknown) {
    // Check existing user
    const existingUser = await users.list([Query.equal("email", [user.email])]);
    return existingUser.users[0];

    console.error("An error occurred while creating a new user:", error);
  }

  // Check existing user
};
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

export const loginUser = async ({ email, password }: LoginParams) => {
  try {
    const result = await account.createEmailPasswordSession(email, password);
    return parseStringify(result);
  } catch (error) {
    console.error(error);
  }
};

export const deleteCurrentSession = async () => {
  try {
    await account.deleteSessions();
  } catch (error) {
    console.error(error);
  }
};
