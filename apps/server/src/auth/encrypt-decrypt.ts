import bcrypt from "bcrypt";
import { json } from "express";

export async function encrypt(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function decrypt(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

interface TouristData {
  name: string;
  code: number;
  phn_no: number;
  email: string;
  dob?: string | Date; 
  gender?: string; 
  aadhar_no: number;
  password: string;
}

export async function generatedPublicKey(data: TouristData): Promise<string> {
  // const secretKey = "team_voxforge";
  const json_data = JSON.stringify(data);
  const public_bcrypt_key = await bcrypt.hash(json_data, 10);
  return public_bcrypt_key;
}