import { UserModel } from "../models";
import { IUser } from "../interfaces";

class UserRepository {
  /**
   * Create a new user application in the database.
   *
   * This function saves a new user entry (LPG application) using the data provided.
   *
   * @param {IUser} data - User application data (like Aadhar number, income, etc.).
   * @returns The created user document.
   */
  async create(data: IUser) {
    return await UserModel.create(data);
  }

  /**
   * Find a user by their Aadhar number.
   *
   * This function searches the database for a user matching the given Aadhar number.
   *
   * @param {string} aadharNumber - Aadhar number to search for.
   * @returns The user document if found, otherwise null.
   */
  async findByAadhar(aadharNumber: string) {
    return await UserModel.findOne({ aadharNumber });
  }
}

export const userRepo = new UserRepository();
