<template>
  <div class="toDoList">
    <div class="list">
      <ToDoListInput />
      <ToDoListContent />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-073?Authorization=CWA-0607CF65-9F25-43CD-A406-925A5427FB91&locationName=%E8%A5%BF%E5%8D%80&elementName=AT,T&startTime=2024-03-22T00%3A00%3A00&dataTime=2024-03-23T00%3A00%3A00"
axios.get(url).then((res) => {
  const a = res.data.records.locations[0].location[0].weatherElement[0].time[0].elementValue[0].value
  const b = res.data.records.locations[0].location[0].weatherElement[1].time[0].elementValue[0].value
  console.log("體感溫度：", a, "℃", " 溫度：", b, "℃")
});
try {//Dev Note 硯丞 try catch
  const a = avc();
} catch (error) {
  console.error("try catch 練習:", error);
}
export default {
  name: 'IndexPage'

}
</script>

<style scoped>
.toDoList {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list {
  width: 40vw;
  display: flex;
  flex-direction: column;
}
</style>
