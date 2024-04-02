<template>
  <div class="inputLayout">
    <cube-input v-model="newTask" placeholder="輸入你的待辦事項..." class="listInput" />
    <cube-button @click="addTask">新增</cube-button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  data() {
    return {
      newTask: "",//Dev 硯丞 目前輸入的文字 //Dev 硯丞 store內的state

    };
  },
  computed: {
    ...mapGetters({   // 對象形式 
      startId: "ToDoListStore/startId",
      newPage: "ToDoListStore/newPage",
    }),
  },
  methods: {
    ...mapActions({   // 對象形式 
      addTaskStore: "ToDoListStore/addTask",
    }),
    ...mapMutations({
      addStartId: "ToDoListStore/addStartId",
    }),
    addTask() {
      //Dev 硯丞 把輸入的資料賦予id、類型、完成情況後加入清單，把初始id+1，以保持id的唯一性，並清空input存取的值
      if (this.newTask !== "") {
        const list = {
          id: this.startId,
          task: this.newTask,
          done: false,
          cateGory: this.newPage
        }
        this.addTaskStore(list);
        this.addStartId();
        this.newTask = "";
      }
    }
  },
  mounted() {
    this.$localStorage.set("data", { name: "bobee" }); //Dev 硯丞 資料存進localStorage
    this.$cookies.set("bobee", { age: 11 }); //Dev 硯丞 cookies
    this.$session.set('user', { name: 'John' }); //Dev 硯丞 session

    console.log("localStorage:", this.$localStorage.get("data")); //Dev 硯丞 把資料從localStorage取出
    console.log("cookies:", this.$cookies.get("bobee")); //Dev 硯丞 把資料從cookies取出
    console.log("session:", this.$session.get('user')); //Dev 硯丞 把資料從session取出
  }
};
</script>

<style scoped>
.inputLayout {
  width: 100%;
  display: flex;
}

.listInput {
  width: 98.5%;
}

.inputLayout button {
  border-radius: 5px;
  margin-left: 1%;
  width: 15%;
}

.inputLayout Input {
  border-radius: 10px;
}

@media (max-width: 300px) {
  .listInput {
    width: 85%;
  }

  .inputLayout button {
    width: 20%;
    padding: 10px;
    font-size: 12px;
  }
}

@media (min-width: 300px) and (max-width: 575px) {
  .inputLayout button {
    padding: 10px;
    font-size: 12px;
  }
}
</style>
