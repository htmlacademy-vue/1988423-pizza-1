import Vue from "vue";
import App from "@/App";
import router from "@/router";
import "@/common/directives/clickOutside";
import "@/common/directives/autofocus";
import "@/plugins/ui";
import "@/plugins/priceFormat";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
