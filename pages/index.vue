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
