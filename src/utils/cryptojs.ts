import * as cryptoAES from 'crypto-js/aes'
import * as enc_utf8 from 'crypto-js/enc-utf8'
import { encryptKey } from '../custom.config'

export const encryptAES = (
  content: string,
  key: string = encryptKey
): string => {
  return cryptoAES.encrypt(content, key).toString()
}

export const decryptAES = (
  ciphertext: string,
  key: string = encryptKey
): string => {
  return cryptoAES.decrypt(ciphertext, key).toString(enc_utf8)
}

export const encryptAESForJSONStringify = (
  content: any,
  key: string = encryptKey
): string => {
  return cryptoAES.encrypt(JSON.stringify(content), key).toString()
}

export const decryptAESForJSONParse = (
  ciphertext: string,
  key: string = encryptKey
): any => {
  return JSON.parse(cryptoAES.decrypt(ciphertext, key).toString(enc_utf8))
}
