// store/WeatherStore.js
import axios from "axios";
export const state = () => ({
  weather: [], //Dev 硯丞 天氣
});

export const getters = {
  weather(state) {
    return state.weather;
  },
};

export const mutations = {
  setWeather(state, weather) {
    //Dev 硯丞 把體感溫度及溫度解構出來後塞入state內
    const bobyTemperature =
      weather.weatherElement[0].time[0].elementValue[0].value;
    const Temperature = weather.weatherElement[1].time[0].elementValue[0].value;

    state.weather.push(bobyTemperature, Temperature);
  },
};

export const actions = {
  async getWeather({ commit }, weatherApi) {
    //Dev 硯丞 接取氣象局開源api+初步解構 weatherApi -> 由vue傳過來的api儲存變數
    try {
      const weather = await axios.get(weatherApi);
      commit("setWeather", weather.data.records.locations[0].location[0]);
    } catch (error) {
      console.error("error weather:", error);
    }
  },
};

export default {
  namespaced: true, // 添加命名空間
  state,
  getters,
  mutations,
  actions,
};
