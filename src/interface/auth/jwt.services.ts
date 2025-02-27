import Jwt from "jsonwebtoken";
import "dotenv/config";

const Jwt_Access_Secret: string = process.env.JWT_ACCESS_TOKEN_SECRET || "";
const Jwt_Refresh_Secret: string = process.env.JWT_REFRESH_TOKEN_SECRET || "";
const Jwt_Refresh_Expiry: string = process.env.JWT_REFRESH_EXPIRY || "20s";
const Jwt_Access_Expiry: string = process.env.JWT_ACCESS_EXPIRY || "20s";

type Auth = {
  id: string;
  role: string;
};

if (!Jwt_Access_Secret) {
  throw new Error(
    "JWT_ACCESS_TOKEN_SECRET is not defined in environment variables."
  );
}

export const generateAccessToken =async  (userId: string, role: string): Promise<string> => {
  const payload: Auth = {
    id: userId,
    role: role,
  };

  return Jwt.sign(payload, Jwt_Access_Secret, { expiresIn: "10s" });
};

export const generateRefreshToken = (userId: string, role: string) => {
  const payload: Auth = {
    id: userId,
    role: role,
  };

  return Jwt.sign(payload,Jwt_Refresh_Secret,{expiresIn:"1d"})
};
