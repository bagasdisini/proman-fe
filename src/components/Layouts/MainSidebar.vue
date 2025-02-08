<template>
  <div
    :class="[
      'sidebar-area position-fixed start-0 top-0 bg-black h-100vh transition',
      { active: stateStoreInstance.open },
    ]"
    id="sidebar-area"
  >
    <div class="logo position-absolute start-0 end-0 top-0 bg-black">
      <router-link
        to="/"
        class="d-flex align-items-center text-white text-decoration-none"
      >
        <img src="../../assets/images/favicon.png" alt="logo-icon" />
        <span class="fw-bold ms-10">ProMan</span>
      </router-link>
      <div class="border-bottom"></div>
      <button
        class="sidebar-burger-menu position-absolute lh-1 bg-transparent p-0 border-0"
        @click="stateStoreInstance.onChange"
      >
        <i class="ph-duotone ph-caret-double-right"></i>
      </button>
    </div>
    <div class="sidebar-menu">
      <ul
        class="sidebar-navbar-nav ps-0 mb-0 list-unstyled accordion"
        id="sidebarNavAccordion"
      >
        <li class="sidebar-nav-item">
          <router-link to="/home" class="sidebar-nav-link d-block">
            <i class="flaticon-more-1"></i>
            <span class="title">Dashboard</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item">
          <router-link to="/project-list" class="sidebar-nav-link d-block">
            <i class="flaticon-layer-2"></i>
            <span class="title">Project List</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item">
          <router-link to="/task-list" class="sidebar-nav-link d-block">
            <i class="flaticon-draft"></i>
            <span class="title">Task List</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item">
          <router-link to="/member-list" class="sidebar-nav-link d-block">
            <i class="flaticon-user-3"></i>
            <span class="title">Member List</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item">
          <router-link to="/calendar" class="sidebar-nav-link d-block">
            <i class="flaticon-calendar"></i>
            <span class="title">Calendar</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import stateStore from "../../utils/store";

export default defineComponent({
  name: "MainSidebar",
  setup() {
    const stateStoreInstance = stateStore;
    return {
      stateStoreInstance,
    };
  },
});
</script>
