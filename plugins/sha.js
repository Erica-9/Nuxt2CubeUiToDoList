import { SHA256 } from "crypto-js";
export default ({ app }, inject) => {
  inject("shaTest", {
    hashSHA256(data) {
      const hash = SHA256(data);
      return hash.toString();
    },
  });
};
