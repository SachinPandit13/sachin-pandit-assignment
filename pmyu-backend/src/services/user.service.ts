import { userRepo } from "../repositories";
import { IUser } from "../interfaces";

class UserServices {
  /**
   * Apply for an LPG connection using user data.
   *
   * This function checks if the Aadhar number already exists in the system.
   * If it does, it throws an error. Otherwise, it creates a new application.
   *
   * @param {IUser} data - The user's application data (including Aadhar and income).
   * @returns {Promise<any>} The newly created user application document.
   * @throws {Error} If the Aadhar number is already registered.
   */
  async applyForm(data: IUser) {
    const existingAadhar = await userRepo.findByAadhar(data.aadharNumber);
    if (existingAadhar) throw new Error("Aadhar allready exist");
    return await userRepo.create(data);
  }
  /**
   * Get the current status of a user's LPG application.
   *
   * This function finds the user application using their Aadhar number
   * and returns the data if available.
   *
   * @param {string} aadharNumber - Aadhar number to check status for.
   * @returns {Promise<any>} The user's application data or null if not found.
   */
  async getStatusByAadhar(aadharNumber: string) {
    return await userRepo.findByAadhar(aadharNumber);
  }
}
export const userServices = new UserServices();
