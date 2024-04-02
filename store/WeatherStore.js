// store/WeatherStore.js
import axios from "axios";
export const state = () => ({
  weather: [],
});

export const getters = {
  weather(state) {
    return state.weather;
  },
};

export const mutations = {
  setWeather(state, weather) {
    //Dev 硯丞 加入代辦清單，List -> 要加入的待辦清單(array)，並且依照是否完成(done)做排序，完成的放在最後面
    const bobyTemperature =
      weather.weatherElement[0].time[0].elementValue[0].value;
    const Temperature = weather.weatherElement[1].time[0].elementValue[0].value;

    state.weather.push(bobyTemperature, Temperature);
  },
};

export const actions = {
  async getWeather({ commit }, weatherApi) {
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
