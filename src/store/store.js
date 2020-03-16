import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const user = JSON.parse(localStorage.getItem('user')) || null;

export default new Vuex.Store({
  state: {
    user,
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
  },
  mutations: {
    CLEAR_USER_DATA() {
      localStorage.removeItem('user');
      location.reload();
    },
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userData.token}`;
    },
  },
  actions: {
    login({commit}, credentials) {
      return axios
        .post('//localhost:3000/login', credentials)
        .then(({data}) => {
          commit('SET_USER_DATA', data);
        });
    },
    logout({commit}) {
      commit('CLEAR_USER_DATA');
    },
    register({commit}, credentials) {
      return axios
        .post('//localhost:3000/register', credentials)
        .then(({data}) => {
          console.log('user data is', data);
          commit('SET_USER_DATA', data);
        });
    },
  },
});
