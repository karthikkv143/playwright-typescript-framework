import cryptojs from 'crypto-js';

export default class CommonUtils {

    private secretKey: string;

    constructor() {
        const encryptionKey = process.env.ENCRYPTION_KEY;
        if (!encryptionKey) {
            throw new Error('ENCRYPTION_KEY is not defined in environment variables');
        }
        this.secretKey = encryptionKey;
    }

    /**
     * Encrypts the given data using AES encryption with a secret key.
     * @param data - The data to be encrypted
     * @returns The encrypted data as a string
     */
    public encryptData(data: string): string {
        return cryptojs.AES.encrypt(data, this.secretKey.toString()).toString();
    }

    /**
     * Decrypts the given encrypted data using AES decryption with a secret key.
     * @param encryptedData - The data to be decrypted
     * @returns The decrypted data as a string
     */
    public decryptData(encryptedData: string): string {
        return cryptojs.AES.decrypt(encryptedData, this.secretKey.toString()).toString(cryptojs.enc.Utf8);
    }
}