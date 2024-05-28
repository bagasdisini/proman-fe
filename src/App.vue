<template>
  <MainHeader v-if="showHeader" />
  <MainSidebar v-if="showSidebar" />
  <div :class="mainContentClass">
    <router-view />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watchEffect } from "vue";
import { useRoute } from "vue-router";
import stateStore from "./utils/store";

import MainHeader from "./components/Layouts/MainHeader.vue";
import MainSidebar from "./components/Layouts/MainSidebar.vue";

export default defineComponent({
  name: "App",
  components: {
    MainHeader,
    MainSidebar,
  },
  mounted() {
    document.body.classList.add("bg-body-secondary");
  },
  setup() {
    const route = useRoute();

    const mainContentClass = computed(() => {
      return route.path === "/login" || route.path === "/register" || route.path === "/forgot-password" || route.path === "/reset-password"
          ? "main-content-login d-flex flex-column transition overflow-hidden"
          : "main-content d-flex flex-column transition overflow-hidden";
    });

    const showHeader = computed(() => {
      return route.path !== "/login" && route.path !== "/register" && route.path !== "/forgot-password" && route.path !== "/reset-password";
    });

    const showSidebar = computed(() => {
      return route.path !== "/login" && route.path !== "/register" && route.path !== "/forgot-password" && route.path !== "/reset-password";
    });

    const stateStoreInstance = stateStore;
    watchEffect(() => {
      if (stateStoreInstance.open) {
        document.body.classList.remove("sidebar-show");
        document.body.classList.add("sidebar-hide");
      } else {
        document.body.classList.remove("sidebar-hide");
        document.body.classList.add("sidebar-show");
      }
    });
    return { mainContentClass, showHeader, showSidebar };
  },
  created() {
    const isAuthenticated = !!localStorage.getItem('jwt');
    if (isAuthenticated) {
      this.$router.push({ name: 'HomePage' });
    }
  }
});
</script>