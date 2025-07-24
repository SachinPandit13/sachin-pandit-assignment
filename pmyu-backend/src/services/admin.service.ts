import { UserStatus } from "../enums";
import { userRepo } from "../repositories";
import { adminRepo } from "../repositories/admin.repository";
import { aadharData } from "../mock-datas";
class AdminServices {
  /**
   * Get all LPG applications from the database.
   * It returns list of all applications
   */
  async getAll() {
    return await adminRepo.findAll();
  }

  /**
   * Approve a user's LPG application.
   * Calculates subsidy, sets a setup date (7 days later),
   * and adds officer details.
   *
   * @param {string} aadharNumber - Aadhar number of the user to approve.
   * @returns Updated user application data.
   * @throws {Error} If user is not found.
   */
  async approve(aadharNumber: string) {
    const user = await userRepo.findByAadhar(aadharNumber);
    if (!user) throw new Error("User not found");
    const subsidy = this.calculateSubsidy(user.income);
    const setupDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10); // 7 days ahead

    const officer = {
      name: "Rajeev Sharma",
      designation: "District Supply Officer",
      contact: "+91-9876543210",
    };

    return adminRepo.updateSatusByAadhar(aadharNumber, {
      status: UserStatus.Approved,
      subsidyAmount: subsidy,
      setupDate,
      officer,
      rejectionReason: "",
    });
  }

  /**
   * Reject a user's LPG application with a given reason.
   *
   * @param {string} aadharNumber - Aadhar number of the user to reject.
   * @param {string} reason - Reason for rejection.
   * @returns Updated user application data.
   * @throws {Error} If user is not found.
   */
  async reject(aadharNumber: string, reason: string) {
    const user = await userRepo.findByAadhar(aadharNumber);
    if (!user) throw new Error("User not found");

    return adminRepo.updateSatusByAadhar(aadharNumber, {
      status: UserStatus.Rejected,
      rejectionReason: reason,
      subsidyAmount: 0,
      setupDate: "",
      officer: {},
    });
  }

    /**
   * Calculate subsidy based on user's income.
   * Lower the income, higher the subsidy (up to ₹1000).
   *
   * @param {number} income - User's yearly income.
   * @returns {number} Calculated subsidy amount.
   */
  private calculateSubsidy(income: number): number {
    if (income <= 0) return 0.5 * 1000;
    if (income <= 25000) return 0.4 * income;
    if (income <= 50000) return 0.3 * income;
    if (income <= 75000) return 0.2 * income;
    if (income <= 100000) return 0.1 * income;
    return 0;
  }

   /**
   * Check if the given Aadhar number exists in mock data.
   *
   * @param {string} aadharNumber - Aadhar number to validate.
   * @returns {boolean} True if Aadhar is valid, otherwise false.
   */
  async validateAadhar(aadharNumber: string): Promise<boolean> {
    const found = aadharData.find((item) => item.aadharNumber === aadharNumber);
    return !!found;
  }
}

export const adminServices = new AdminServices();
