<template>
    <cube-tab-bar v-model="selectedLabelDefault" inline @change="changeHandler" class="footer">
        <cube-tab v-for="(item, index) in tabs" :icon="item.icon" :label="item.label" :key="item.label">
        </cube-tab>
    </cube-tab-bar>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            //Dev 硯丞 目前需顯示的頁面
            selectedLabelDefault: 'Life',
            //Dev 硯丞 Footer要顯示的文字以及icon圖案
            tabs: [{
                label: 'Life',
                icon: 'cubeic-home'
            }, {
                label: 'Work',
                icon: 'cubeic-like'
            }],
        }
    },
    methods: {
        ...mapActions({   // 對象形式 
            changePage: "ToDoListStore/changePage",
        }),
        //Dev 硯丞 若是更換選擇的面，更新 store 存取的目前頁面
        changeHandler(label) {
            console.log("123")
            this.changePage(label);
        }
    }
}
</script>

<style scoped>
.footer {
    background-color: white;
    border: solid 3px rgb(189, 189, 189);
    padding: 10px 0;
    z-index: 100;
    position: fixed;
    bottom: 0px;
    font-size: 20px;
}

@media (min-width: 0px) and (max-width: 1024px) {
    .footer {
        width: 100%;
    }
}

@media(min-width: 1024px) and (max-width: 1200px) {
    .footer {
        width: 60vw;
    }
}

@media(min-width: 1201px) {
    .footer {
        width: 40vw;
    }
}
</style>