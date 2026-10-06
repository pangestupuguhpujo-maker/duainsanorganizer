import { hash, verify } from '@node-rs/argon2';

/**
 * Argon2id Recommended Baseline Parameters:
 * - memoryCost: 19456 KiB (~19 MiB)
 * - timeCost: 2 iterations
 * - parallelism: 1 lane
 * - outputLen: 32 bytes
 * - algorithm: Argon2id (Algorithm.Argon2id / 2)
 */
const ARGON2_CONFIG = {
  algorithm: 2, // Argon2id
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

/**
 * Hash a plaintext password securely using Argon2id with random salt.
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  return hash(password, ARGON2_CONFIG);
}

/**
 * Verify a plaintext password against an Argon2id hash in constant time.
 */
export async function verifyPassword(passwordHash: string, candidatePassword: string): Promise<boolean> {
  if (!passwordHash || !candidatePassword) {
    return false;
  }

  try {
    return await verify(passwordHash, candidatePassword, ARGON2_CONFIG);
  } catch {
    // Return false on malformed hash or verification error without leaking internal details
    return false;
  }
}
