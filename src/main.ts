import Vue from "vue";
import App from "@/App.vue";
import router from "./router";
import Vuelidate from "vuelidate";

import "./assets/scss/custom.scss";

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
