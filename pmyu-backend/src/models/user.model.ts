import { Schema, model } from "mongoose";
import { IUser } from "../interfaces";
import { UserStatus } from "../enums";

export class User {
  static schema = new Schema<IUser>(
    {
      aadharNumber: { type: String, required: true, unique: true },
      income: { type: Number, required: true },
      status: {
        type: String,
        enum: Object.values(UserStatus),
        default: UserStatus.Pending,
      },
      setupDate: { type: String },
      subsidyAmount: { type: Number },
      officer: {
        name: { type: String },
        designation: { type: String },
        contact: { type: String },
      },
      rejectionReason: {type: String},
    },
    { timestamps: true, versionKey: false }
  );

  static model = model<IUser>("User", User.schema);
}

// Export shortcut
export const UserModel = User.model;
