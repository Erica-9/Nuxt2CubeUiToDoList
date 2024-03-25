<template>
  <div class="inputLayout">
    <cube-input v-model="newTask" placeholder="輸入你的待辦事項..." class="listInput" />
    <cube-button @click="addTask">新增</cube-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: "",//Dev 硯丞 目前輸入的文字
      store: this.$store.state.ToDoListStore, //Dev 硯丞 store內的state

    };
  },
  methods: {
    addTask() { //Dev 硯丞 把輸入的資料賦予id、類型、完成情況後加入清單
      if (this.newTask !== "") {
        const list = {
          id: this.store.startId,
          task: this.newTask,
          done: false,
          cateGory: this.store.newPage
        }
        this.$store.dispatch("ToDoListStore/addTask", list);
        this.$store.commit("ToDoListStore/addStartId")
        this.newTask = "";
      }
    }
  }
};
</script>

<style scoped>
.inputLayout {
  margin-top: 10px;
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
</style>
