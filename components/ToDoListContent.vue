<template>
    <div class="listLayout">
        <div class="listButton">
            <div>
                <button @click="filterList('life')" :class="{ filterButtom: filterButtom('life') }"
                    class="otherButton">生活</button>
                <button @click="filterList('work')" :class="{ filterButtom: filterButtom('work') }"
                    class="otherButton">工作</button>
            </div>
            <div class="selected" v-show="newSelects.length != 0">
                <div>已選取{{ newSelects.length }}項任務</div>
                <cube-button :light="true" class="selectedButton" @click="finishList">完成</cube-button>
                <cube-button :light="true" class="selectedButton" @click="deleteList">刪除</cube-button>
            </div>
        </div>
        <div>
            <ul>
                <li v-if="lists.length === 0" class="noList">您未新增任何待辦清單</li>
                <cube-checkbox-group v-else v-model="newSelects" v-for="(List, index) in lists" :key="List.id"
                    :class="{ finishList: List.done }" class="list">
                    <cube-checkbox :option="{ value: List.id }" v-show="!List.done" v-if="edit != List.id">
                    </cube-checkbox>
                    <i class="listText">
                        <div v-if="edit == List.id" class="listContent">
                            <cube-input type="text" :class="{ done: List.done }" v-model="newTask" class="contentInput"
                                @keyup.enter="addTask"></cube-input>
                            <div class="contentButton">
                                <cube-button @click="addTask" class="checkButton">確定</cube-button>
                            </div>
                        </div>
                        <div v-else class="listContent">
                            <div class="listContentText">
                                <p :class="{ done: List.done }">
                                    <nuxt-link :to="'/Routing/' + List.task">{{ List.task }}</nuxt-link>
                                </p>
                            </div>
                            <div class="contentButton">
                                <cube-button @click="editList(List.id, List.task)" v-show="!List.done">編輯</cube-button>
                            </div>
                        </div>
                    </i>
                </cube-checkbox-group>
            </ul>
        </div>
        <div>
            <div class="clearButton">
                <div>目前有{{ lists.length }}項任務</div>
                <cube-button class="clearList" @click="clearList">清除所有任務</cube-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            store: this.$store.state.ToDoListStore, //Dev 硯丞 store內的state
            newSelects: [], //Dev 硯丞 目前選取的所有待辦清單id
            newTask: "", //Dev 硯丞 點選編輯後輸入的內容
            edit: "", //Dev 硯丞 儲存目前點選編輯的待辦清單id
        };
    },
    computed: {
        lists() {
            // Dev 硯丞 重新渲染時清空目前選取的清單並篩選目前需顯示的待辦清單類型是工作還是生活
            this.newSelects = []
            return this.store.lifeTasks.filter(i => i.cateGory === this.store.newPage)
        }

    },
    methods: {
        addTask() {
            //Dev Note 硯丞 將要修改的待辦清單id及內容傳送到ToDoListthis.store做儲存，並清空要輸入的內容及選取的id，
            if (this.newTask != "") {
                const edit = { id: this.edit, text: this.newTask }
                this.$store.dispatch("ToDoListStore/editListText", edit);
                this.newTask = "";
                this.edit = ""
            }
            this.newSelects = []

        },
        editList(id, text) {
            //Dev Note 硯丞 點選編輯後，將要編輯的待辦清單id(id)及原本的內容(text)存起來
            this.edit = id
            this.newTask = text
            this.newSelects = []
        },
        filterList(Change) {
            /*Dev Note 硯丞 切換要顯示的待辦清單後，更改存取在ToDoListStore，目前的清單頁面，
            清空已選取的待辦清單，取消需編輯的待辦清單，Change -> 要更換頁面名稱(string)*/
            this.$store.dispatch("ToDoListStore/changePage", Change);
            this.newSelects = []
            this.edit = ""
        },
        filterButtom(Filter) {
            //Dev Note 硯丞 切換待辦清單類型的按鈕class判斷，Filter -> 點選的按鈕要切換的頁面名稱(string)
            return this.store.newPage == Filter
        },
        deleteList() {
            //Dev Note 硯丞 刪除newSelects內已選取的待辦清單
            this.$store.dispatch("ToDoListStore/deleteList", this.newSelects);
            this.newSelects = []
        },
        finishList() {
            this.$store.dispatch("ToDoListStore/finishList", this.newSelects);
            //Dev Note 硯丞 完成newSelects內已選取的待辦清單
            this.newSelects = []
        },
        clearList() {
            //Dev Note 硯丞 清空所有待辦清單
            this.$store.commit("ToDoListStore/clearList")
            this.newSelects = []
        },
    },

};

</script>

<style scoped>
.listLayout {
    background-color: #F0F0F0;
    border: 5px solid #F0F0F0;
    padding: 10px 0;
    border-radius: 5px;
    margin-top: 10px;
}

.selected {
    display: flex;
    margin-bottom: 3px;
}

.listButton {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.filterButtom {
    color: #4a4c5b;
    background-color: rgb(255, 255, 255);
}

.finishButton {

    height: 35px;
    padding: 0 5px;
    border-radius: 5px 5px 0 0;
    border: 0px;
}

.filterFinishButtom {
    color: white;
    background-color: rgb(189, 189, 189);
}

.otherButton {
    height: 35px;
    padding: 0 5px;
    border-radius: 5px 5px 0 0;
    margin-right: 5px;
    border: 0px;
}

ul {
    background-color: white;
    padding: 0;
    width: 100%;
    margin: 0;
}

ul li {
    height: auto;
    list-style-type: none;
    border-bottom: 3px solid #F0F0F0;
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.listContent {
    width: 100%;
    height: auto;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
}

.contentInput {
    margin: 0px 10px;
    width: 98%;
}

.contentButton {
    display: flex;
    align-items: center;
    justify-content: center;
}

.contentButton button {
    width: 60px;
}

.listContentText {
    margin-left: 10px;
    min-width: 80%;
    display: flex;
}

li input {
    zoom: 130%;
    margin: 1px 10px 0 5px;
}

.listContentText p {
    max-width: 90%;
    word-wrap: break-word;
    height: auto;
    margin: 0;
    line-height: 50px;
}

.finishList {
    background-color: rgb(189, 189, 189);
    list-style: circle;
}

.filishToDo {
    padding: 0 0 0 10px;
    font-size: 30px;
    color: #00a326;
    font-weight: bold;
    line-height: 50px;
}

.deleteList {
    padding: 0 0 0 10px;
    color: rgb(0, 0, 0);
    font-size: 40px;
    background-color: rgba(255, 222, 173, 0);
    border: 0px;
}

.done {
    text-decoration: line-through;
}

.clearButton {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    align-items: center;
}

.selectedButton {
    border-radius: 5px;
    margin-left: 5px;
    padding: 3px;
    width: auto;
    height: auto;
    font-size: 12px;
    transition-duration: 0.5s;
}

.selected div {
    display: flex;
    align-items: center;
}

.clearList {
    width: auto;
}

.list {
    display: flex;
}

.listText {
    min-width: 88%;
    max-width: 100%;
}

.checkButton {
    margin-right: -66px;
}

.noList {
    padding: 10px;
}
</style>