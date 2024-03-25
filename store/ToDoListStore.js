// store/ToDoListStore.js
export const state = () => ({
  newPage: "life",
  lifeTasks: [],
  startId: 1,
  temperature: "",
  bodyTemperature: "",
});

export const mutations = {
  addTask(state, list) {
    //Dev 硯丞 加入代辦清單，List -> 要加入的待辦清單(array)，並且依照是否完成(done)做排序，完成的放在最後面
    state.lifeTasks.push(list);
    state.lifeTasks = state.lifeTasks.sort((a, b) => a.done - b.done);
  },
  addStartId(state) {
    //Dev 硯丞 待辦清單的id值欄位+1，增加一個待辦清單後就加1，維持id的唯一性
    state.startId++;
  },
  deleteList(state, listId) {
    //Dev 硯丞 刪除代辦清單，listId -> 要刪除的待辦清單id(array)，依序找出對應id的清單的索引後依序刪除
    for (let i = 0; i < listId.length; i++) {
      let DeleteData = state.lifeTasks.findIndex(
        (item) => item.id === parseInt(listId[i])
      );
      if (DeleteData !== -1) {
        state.lifeTasks.splice(DeleteData, 1);
      }
    }
  },
  finishList(state, listId) {
    //Dev 硯丞 完成代辦清單，listId -> 要完成的待辦清單id(array)，依序找出對應id的清單的索引後依序完成，並且依照是否完成(done)做排序，完成的放在最後面
    for (let i = 0; i < listId.length; i++) {
      let finishData = state.lifeTasks.findIndex(
        (item) => item.id === parseInt(listId[i])
      );
      if (finishData !== -1) {
        state.lifeTasks[finishData].done = true;
        state.lifeTasks = state.lifeTasks.sort((a, b) => a.done - b.done);
      }
    }
  },
  editListText(state, edit) {
    //Dev 硯丞 編輯特定代辦清單，edit(array) -> 要編輯的待辦清單id及內容text
    const editList = state.lifeTasks.findIndex((item) => item.id === edit.id);
    if (editList !== -1) {
      state.lifeTasks[editList].task = edit.text;
    }
  },
  clearList(state) {
    //Dev 硯丞 清空所有待辦清單，並把id初始值還原為1
    state.lifeTasks.splice(0, state.lifeTasks.length);
    state.startId = 1;
  },
  changePage(state, pageName) {
    //Dev 硯丞 儲存目前更換頁面，pageName -> 更換的頁面(string)
    state.newPage = pageName;
  },
};

export const actions = {
  addTask({ commit }, List) {
    //Dev 硯丞 加入代辦清單，List -> 要加入的待辦清單(array)
    commit("addTask", List);
  },
  deleteList({ commit }, listId) {
    //Dev 硯丞 刪除代辦清單，listId -> 要刪除的待辦清單id(array)
    commit("deleteList", listId);
  },
  finishList({ commit }, listId) {
    //Dev 硯丞 完成代辦清單，listId -> 要完成的待辦清單id(array)
    commit("finishList", listId);
  },
  editListText({ commit }, edit) {
    //Dev 硯丞 編輯特定代辦清單，edit -> 要編輯的待辦清單id及內容(array)
    commit("editListText", edit);
  },
  clearList({ commit }) {
    //Dev 硯丞 刪除全部代辦清單
    commit("clearList");
  },
  changePage({ commit }, pageName) {
    //Dev 硯丞 儲存目前更換頁面，pageName -> 更換的頁面(string)
    commit("changePage", pageName);
  },
};
