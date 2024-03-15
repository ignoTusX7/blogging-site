import { compare, hash, genSalt } from "bcrypt-ts";

class PasswordEncryptor {
  private async genS() {
    const salt = await genSalt(10);
    return salt;
  }

  // Method to encrypt a password
  async encryptPassword(password: string): Promise<string> {
    const salt = await this.genS();
    const hashed = await hash(password, salt);
    return hashed;
  }

  // Method to decrypt a password (just for reference, not recommended to decrypt passwords)
  async decryptPassword(
    password: string,
    encryptedPassword: string
  ): Promise<boolean> {
    // Decrypt the password using AES decryption
    const isValid = await compare(password, encryptedPassword);
    return isValid;
  }
}

// Example usage:
export const encryptor = new PasswordEncryptor();

export function createSlug(input: string) {
  // Convert the string to lowercase
  let slug = input.toLowerCase();

  // Replace '&' with 'and'
  slug = slug.replace(/&/g, "and");

  // Replace spaces with dashes
  slug = slug.replace(/\s+/g, "-");

  // Remove special characters
  slug = slug.replace(/[^\w\s-]/g, "");

  // Trim leading and trailing spaces
  slug = slug.trim();

  return slug;
}

