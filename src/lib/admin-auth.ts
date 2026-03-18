import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";
const JWT_SECRET_ENV = process.env.ADMIN_JWT_SECRET ?? "";

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_JWT_SECRET must be set and at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

export const ADMIN_COOKIE = COOKIE_NAME;
export { JWT_SECRET_ENV };

export async function signAdminToken(): Promise<string> {
  const secret = getJwtSecret();
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .setSubject("admin")
    .sign(secret);
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const secret = getJwtSecret();
    await jwtVerify(token, secret, { subject: "admin" });
    return true;
  } catch {
    return false;
  }
}
