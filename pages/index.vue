<template>
  <div class="toDoList">
    <div class="list">
      <ToDoListInput />
      <ToDoListContent />
    </div>
    <ToDoListFooter />
  </div>
</template>

<script>
try {//Dev Note 硯丞 try catch
  const a = avc();
} catch (error) {
  console.error("try catch 練習:", error);
}
export default {
  mounted() {
    this.$localStorage.set("data", { name: "bobee" }); //Dev 硯丞 資料存進localStorage
    this.$cookies.set("bobee", { age: 11 }); //Dev 硯丞 cookies
    this.$session.set('user', { name: 'John' }); //Dev 硯丞 session

    console.log("localStorage:", this.$localStorage.get("data")); //Dev 硯丞 把資料從localStorage取出
    console.log("cookies:", this.$cookies.get("bobee")); //Dev 硯丞 把資料從cookies取出
    console.log("session:", this.$session.get('user')); //Dev 硯丞 把資料從session取出


    const IV = this.$aecTest.generateRandomIV() //Dev 硯丞 取得加密的隨機初始向量
    const KEY = this.$aecTest.generateRandomKey() //Dev 硯丞 取得加密的隨機密鑰
    const testAes = 'Hello, World!' //Dev 硯丞 宣告須加密的值
    // 加密数据
    const encryptedData = this.$aecTest.encrypt(testAes, KEY, IV)
    console.log('Aes加密后:', encryptedData)
    // 解密数据
    const decryptedData = this.$aecTest.decrypt(encryptedData, KEY, IV)
    console.log('Aes解密后:', decryptedData)

    const testSha = 'Hello, World!';//Dev 硯丞 宣告須加密的值
    const testSha2 = 'Hello, World';
    const hashedText = this.$shaTest.hashSHA256(testSha); //Dev 硯丞 產生摘要
    const hashedText2 = this.$shaTest.hashSHA256(testSha2);
    console.log('Sha加密后1:', hashedText);
    console.log('Sha加密后1:', hashedText2);
  }
}
</script>

<style scoped>
.toDoList {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list {
  margin: 10vh 0;
  display: flex;
  flex-direction: column;
}

@media (min-width: 0px) and (max-width: 1024px) {
  .list {
    width: 90%;
  }
}

@media (min-width: 0px) and (max-width: 527px) {
  .toDoList {
    font-size: 16px;
  }
}

@media(min-width: 1024px) and (max-width: 1200px) {
  .list {
    width: 60vw;
  }
}

@media(min-width: 1201px) {
  .list {
    width: 40vw;
  }
}
</style>
