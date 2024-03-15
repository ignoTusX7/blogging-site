import { AES, enc } from "crypto-js";

class PasswordEncryptor {
  private secretKey: string;

  constructor() {
    // Set a secret key for encryption
    this.secretKey = "my2003@secretKey7is#this";
  }

  // Method to encrypt a password
  encryptPassword(password: string): string {
    // Encrypt the password using AES encryption
    const encryptedPassword: string = AES.encrypt(password, this.secretKey).toString();
    return encryptedPassword;
  }

  // Method to decrypt a password (just for reference, not recommended to decrypt passwords)
  decryptPassword(encryptedPassword: string): string {
    // Decrypt the password using AES decryption
    const decryptedBytes = AES.decrypt(encryptedPassword, this.secretKey);
    const decryptedPassword: string = decryptedBytes.toString(enc.Utf8);
    return decryptedPassword;
  }
}

// Example usage:
export const encryptor = new PasswordEncryptor();
