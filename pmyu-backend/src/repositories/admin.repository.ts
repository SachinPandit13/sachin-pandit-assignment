import { UserModel } from "../models";

class AdminRepository {
  /**
   * Get all user applications from the database.
   *
   * This function fetches every document from the `users` collection.
   *
   * @returns Array of user application documents.
   */
  async findAll() {
    return await UserModel.find();
  }

  /** Update user application data by Aadhar number.
   *
   * This function finds a user using the given Aadhar number and updates
   * their data (like status, subsidy amount, setup date, etc.).
   *
   * @param {string} aadharNumber - Unique Aadhar number to find the user.
   * @param {any} updateData - The fields to update in the user document.
   * @returns The updated user document (if found).
   */
  async updateSatusByAadhar(aadharNumber: string, updateData: any) {
    return UserModel.findOneAndUpdate({ aadharNumber }, updateData);
  }
}

export const adminRepo = new AdminRepository();
