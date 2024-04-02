import { enc, AES } from "crypto-js";
export default ({ app }, inject) => {
  inject("aecTest", {
    generateRandomIV() {
      //Dev 硯丞 生成隨機的初始向量
      const randomWords = Math.random().toString(36).substring(2, 18);
      return enc.Hex.stringify(randomWords);
    },
    generateRandomKey() {
      //Dev 硯丞 生成隨機的金鑰
      const randomWords = Math.random().toString(36).substring(2, 18);
      return enc.Hex.stringify(randomWords);
    },
    encrypt(data, key, iv) {
      //Dev 硯丞 將傳入的data加密
      const keyUtf8 = enc.Utf8.parse(key);
      const ivUtf8 = enc.Utf8.parse(iv);
      const encrypted = AES.encrypt(data, keyUtf8, { iv: ivUtf8 });
      return encrypted.toString();
    },
    decrypt(data, key, iv) {
      //Dev 硯丞 將傳入的data解密
      const keyUtf8 = enc.Utf8.parse(key);
      const ivUtf8 = enc.Utf8.parse(iv);
      const decrypted = AES.decrypt(data, keyUtf8, { iv: ivUtf8 });
      return decrypted.toString(enc.Utf8);
    },
  });
};
