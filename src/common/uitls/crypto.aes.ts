import { BadRequestException } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

const randomString = (length: number, chars: string) => {
  let result = '';
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const keyIv = {
  key: CryptoJS.enc.Utf8.parse(randomString(16, chars)),
  iv: CryptoJS.enc.Utf8.parse(randomString(16, chars)),
};

export const Decrypt = (
  data: any,
  server_key: CryptoJS.lib.WordArray,
  server_iv: CryptoJS.lib.WordArray,
) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(str, server_key, {
    iv: server_iv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.AnsiX923,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  if (decryptedStr.toString() === '') {
    throw new BadRequestException('Decryption failed, unencrypted password');
  }
  return decryptedStr.toString();
};
