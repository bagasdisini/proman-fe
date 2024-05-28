<template>
  <div class="row">
    <div class="col-xxl-4 col-sm-6">
      <div class="card mb-25 border-0 rounded-0 bg-white stats-item" :style="{ height: isLoaded ? 'auto' : '212px' }">
        <loader-component v-if="isLoading" style="margin: auto"/>
        <div v-if="isLoaded" class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="d-flex align-items-center justify-content-between">
            <div
                class="icon position-relative text-primary rounded-1 text-center"
            >
              <i class="flaticon-sterile-box"></i>
            </div>
            <div class="title text-end">
              <span class="d-block fw-bold text-dark-emphasis mb-5">
                Active Projects
              </span>
              <div class="d-flex align-items-center justify-content-end">
                <h3 class="fw-black mb-0 me-10">94</h3>
                <span class="fw-bold text-success text-badge d-inline-block">
                  <i
                      class="flaticon-up-arrow fs-11 lh-1 position-relative top-1"
                  ></i>
                  3.5%
                </span>
              </div>
              <span class="d-block fw-medium text-dark-emphasis mt-5">
                Completed:
                <span class="fw-bold">44</span>
              </span>
            </div>
          </div>
          <div
              class="mt-15 mt-md-25 mb-5 mb-md-8 d-flex justify-content-between align-items-center"
          >
            <span class="fw-medium text-secondary">
              <span class="fw-bold text-black">50</span>
              pending
            </span>
            <span class="text-primary fw-semibold">42%</span>
          </div>
          <div
              class="progress"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
          >
            <div class="progress-bar" style="width: 42%"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xxl-4 col-sm-6">
      <div class="card mb-25 border-0 rounded-0 bg-white stats-item" :style="{ height: isLoaded ? 'auto' : '212px' }">
        <loader-component v-if="isLoading" style="margin: auto"/>
        <div v-if="isLoaded" class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="d-flex align-items-center justify-content-between">
            <div
                class="icon position-relative text-success rounded-1 text-center"
            >
              <i class="flaticon-sugar-cubes"></i>
            </div>
            <div class="title text-end">
              <span class="d-block fw-bold text-dark-emphasis mb-5">
                Total Task
              </span>
              <div class="d-flex align-items-center justify-content-end">
                <h3 class="fw-black mb-0 me-10">94</h3>
                <span class="fw-bold text-danger text-badge d-inline-block">
                  <i
                      class="flaticon-down-arrow fs-11 lh-1 position-relative top-1"
                  >
                  </i>
                  3.5%
                </span>
              </div>
              <span class="d-block fw-medium text-dark-emphasis mt-5">
                Completed: <span class="fw-bold">44</span>
              </span>
            </div>
          </div>
          <div
              class="mt-15 mt-md-25 mb-5 mb-md-8 d-flex justify-content-between align-items-center"
          >
            <span class="fw-medium text-secondary">
              <span class="fw-bold text-black">50</span>
              pending
            </span>
            <span class="text-success fw-semibold">42%</span>
          </div>
          <div
              class="progress"
              role="progressbar"
              aria-valuenow="42"
              aria-valuemin="0"
              aria-valuemax="100"
          >
            <div class="progress-bar bg-success" style="width: 42%"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xxl-4 col-sm-12">
      <div class="card mb-25 border-0 rounded-0 bg-white stats-item" :style="{ height: isLoaded ? 'auto' : '212px' }">
        <loader-component v-if="isLoading" style="margin: auto"/>
        <div v-if="isLoaded" class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="d-flex align-items-center justify-content-between">
            <div
                class="icon position-relative text-danger rounded-1 text-center"
            >
              <i class="flaticon-user-3"></i>
            </div>
            <div class="title text-end">
              <span class="d-block fw-bold text-dark-emphasis mb-5">
                Total Members
              </span>
              <div class="d-flex align-items-center justify-content-end">
                <h3 class="fw-black mb-0 me-10">56</h3>
                <span class="fw-bold text-success text-badge d-inline-block">
                  <i
                      class="flaticon-up-arrow fs-11 lh-1 position-relative top-1"
                  >
                  </i>
                  2.5%
                </span>
              </div>
              <span class="d-block fw-medium text-dark-emphasis mt-5">
                Working:
                <span class="fw-bold">54</span>
              </span>
            </div>
          </div>
          <div class="mt-15 mt-md-20 users-list d-flex align-items-center">
            <div class="rounded-circle text-center">
              <img
                  src="../../assets/images/user/user1.jpg"
                  class="rounded-circle"
                  alt="user"
              />
            </div>
            <div class="rounded-circle text-center">
              <img
                  src="../../assets/images/user/user2.jpg"
                  class="rounded-circle"
                  alt="user"
              />
            </div>
            <div
                class="rounded-circle bg-primary-emphasis text-center d-flex align-items-center justify-content-center text-white fs-16 fw-bold"
            >
              P
            </div>
            <div class="rounded-circle text-center">
              <img
                  src="../../assets/images/user/user4.jpg"
                  class="rounded-circle"
                  alt="user"
              />
            </div>
            <div
                class="rounded-circle bg-primary text-center d-flex align-items-center justify-content-center text-white fs-16 fw-bold"
            >
              S
            </div>
            <div class="rounded-circle text-center">
              <img
                  src="../../assets/images/user/user3.jpg"
                  class="rounded-circle"
                  alt="user"
              />
            </div>
            <div
                class="rounded-circle bg-secondary text-center d-flex align-items-center justify-content-center text-white fs-14 fw-bold"
            >
              +24
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import LoaderComponent from "../Layouts/Loader.vue";

export default defineComponent({
  name: "StatsItem",
  components: {
    LoaderComponent,
  },
  setup() {
    const activeProjects = ref({ total: 0, completed: 0, pending: 0, before: 0});
    const totalTasks = ref({ total: 0, completed: 0, pending: 0 });
    const totalMembers = ref({total: 0, working: 0, additional: 0});
    const isLoading = ref(true);
    const isLoaded = ref(false);

    const fetchData = () => {
      setTimeout(() => {
        activeProjects.value = { total: 50, completed: 10, pending: 5, before: 20 };
        totalTasks.value = { total: 94, completed: 44, pending: 50 };
        totalMembers.value = { total: 56, working: 54, additional: 24 };
        isLoading.value = false;
        isLoaded.value = true;
      }, 100);
    };

    fetchData();
    return { activeProjects, totalTasks, totalMembers, isLoading, isLoaded };
  },
});
</script>

<style scoped>.dot-flashing{position:relative;width:10px;height:10px;border-radius:5px;background-color:#9880ff;color:#9880ff;animation:dot-flashing 1s infinite linear alternate;animation-delay:0.5s}.dot-flashing::before,.dot-flashing::after{content:"";display:inline-block;position:absolute;top:0}.dot-flashing::before{left:-15px;width:10px;height:10px;border-radius:5px;background-color:#9880ff;color:#9880ff;animation:dot-flashing 1s infinite alternate;animation-delay:0s}.dot-flashing::after{left:15px;width:10px;height:10px;border-radius:5px;background-color:#9880ff;color:#9880ff;animation:dot-flashing 1s infinite alternate;animation-delay:1s}@keyframes dot-flashing{0%{background-color:#9880ff}50%,100%{background-color:rgba(152,128,255,.2)}}</style>