import {v4 as uuidv4} from "uuid";
/**
 * Generates a unique invitation code consisting of letters and numbers.
 *
 * @param {number} [length=6] - The length of the invitation code
 * to generate. Defaults to 6 characters.
 * @return {string} - A randomly generated invitation code.
 *
 * @example
 * // Generate an invite code with the default length of 6 characters
 * const code = generateInviteCode();
 * console.log(code); // Example output: "aB3dE1"
 *
 * @example
 * // Generate an invite code with a custom length
 * const code = generateInviteCode(8);
 * console.log(code); // Example output: "AaBbCc12"
 */
export function generateInviteCode(length = 6): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let inviteCode = "";
  for (let i = 0; i < length; i++) {
    inviteCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return inviteCode;
}

/**
 * Generates a new UUID (Universally Unique Identifier).
 * @return {string} A string representing the generated UUID.
 */
export function generateUuid() {
  return uuidv4();
}
