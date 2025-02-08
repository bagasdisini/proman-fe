<template>
  <div class="row">
    <div class="col-xxl-4 col-sm-6">
      <div
        class="card mb-25 border-0 rounded-0 bg-white stats-item"
        :style="{ height: isLoaded ? 'auto' : '212px' }"
      >
        <loader-component v-if="isLoading" style="margin: auto" />
        <div
          v-if="isLoaded"
          class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing"
        >
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
                <h3 class="fw-black">{{ activeProjects.active }}</h3>
              </div>
              <span class="d-block fw-medium text-dark-emphasis mt-5">
                Total:
                <span class="fw-bold">{{
                  activeProjects.active +
                  activeProjects.completed +
                  activeProjects.pending
                }}</span>
              </span>
            </div>
          </div>
          <div
            class="mt-15 mt-md-25 mb-5 mb-md-8 d-flex justify-content-between align-items-center"
          >
            <span class="fw-medium text-secondary">
              Completed:
              <span class="fw-bold text-black">{{
                activeProjects.completed
              }}</span>
            </span>
            <span class="text-primary fw-semibold"
              >{{ completedPercentProject }}%</span
            >
          </div>
          <div
            class="progress"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="progress-bar"
              :style="{ width: completedPercentProject + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xxl-4 col-sm-6">
      <div
        class="card mb-25 border-0 rounded-0 bg-white stats-item"
        :style="{ height: isLoaded ? 'auto' : '212px' }"
      >
        <loader-component v-if="isLoading" style="margin: auto" />
        <div
          v-if="isLoaded"
          class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing"
        >
          <div class="d-flex align-items-center justify-content-between">
            <div
              class="icon position-relative text-success rounded-1 text-center"
            >
              <i class="flaticon-sugar-cubes"></i>
            </div>
            <div class="title text-end">
              <span class="d-block fw-bold text-dark-emphasis mb-5">
                Active Task
              </span>
              <div class="d-flex align-items-center justify-content-end">
                <h3 class="fw-black">{{ activeTasks.active }}</h3>
              </div>
              <span class="d-block fw-medium text-dark-emphasis mt-5">
                Total:
                <span class="fw-bold">{{
                  activeTasks.active +
                  activeTasks.completed +
                  activeTasks.testing
                }}</span>
              </span>
            </div>
          </div>
          <div
            class="mt-15 mt-md-25 mb-5 mb-md-8 d-flex justify-content-between align-items-center"
          >
            <span class="fw-medium text-secondary">
              Completed:
              <span class="fw-bold text-black">{{
                activeTasks.completed
              }}</span>
            </span>
            <span class="text-success fw-semibold"
              >{{ completedPercentTask }}%</span
            >
          </div>
          <div
            class="progress"
            role="progressbar"
            aria-valuenow="42"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="progress-bar bg-success"
              :style="{ width: completedPercentTask + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xxl-4 col-sm-12">
      <div
        class="card mb-25 border-0 rounded-0 bg-white stats-item"
        :style="{ height: isLoaded ? 'auto' : '212px' }"
      >
        <loader-component v-if="isLoading" style="margin: auto" />
        <div
          v-if="isLoaded"
          class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing"
        >
          <div class="d-flex align-items-center justify-content-between">
            <div
              class="icon position-relative text-danger rounded-1 text-center"
            >
              <i class="flaticon-user-3"></i>
            </div>
            <div class="title text-end">
              <span class="d-block fw-bold text-dark-emphasis mb-5">
                Working Members
              </span>
              <div class="d-flex align-items-center justify-content-end">
                <h3 class="fw-black">{{ totalMembers.working }}</h3>
              </div>
              <span class="d-block fw-medium text-dark-emphasis mt-5">
                Total:
                <span class="fw-bold">{{ totalMembers.total }}</span>
              </span>
            </div>
          </div>
          <div
            class="mt-15 mt-md-25 mb-5 mb-md-8 d-flex justify-content-between align-items-center"
          >
            <span class="fw-medium text-secondary">
              Working:
              <span class="fw-bold text-black">{{ totalMembers.working }}</span>
            </span>
            <span class="text-success fw-semibold"
              >{{ completedPercentMember }}%</span
            >
          </div>
          <div
            class="progress"
            role="progressbar"
            aria-valuenow="42"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="progress-bar bg-orange"
              :style="{ width: completedPercentMember + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { API, setAuthToken } from "@/api";
import LoaderComponent from "../Layouts/Loader.vue";

export default defineComponent({
  name: "StatsItem",
  components: {
    LoaderComponent,
  },
  setup() {
    const activeProjects = ref({
      total: 0,
      completed: 0,
      pending: 0,
      active: 0,
    });
    const activeTasks = ref({ total: 0, completed: 0, testing: 0, active: 0 });
    const totalMembers = ref({ total: 0, working: 0 });
    const isLoading = ref(true);
    const isLoaded = ref(false);

    const fetchData = async () => {
      const startTime = performance.now();

      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          setAuthToken(token);
          const projectResponse = await API.get("/me/project/count");
          const taskResponse = await API.get("/me/task/count");
          const memberResponse = await API.get("/user/count");

          activeProjects.value = {
            total: projectResponse.data.total,
            completed: projectResponse.data.completed,
            pending: projectResponse.data.pending,
            active: projectResponse.data.active,
          };

          activeTasks.value = {
            total: taskResponse.data.total,
            completed: taskResponse.data.completed,
            testing: taskResponse.data.testing,
            active: taskResponse.data.active,
          };

          totalMembers.value = {
            total: memberResponse.data.total,
            working: memberResponse.data.have_task,
          };
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      const endTime = performance.now();
      const requestDuration = endTime - startTime;

      const minDelay = 100;
      const remainingTime = Math.max(minDelay - requestDuration, 0);

      setTimeout(() => {
        isLoading.value = false;
        isLoaded.value = true;
      }, remainingTime);
    };

    const completedPercentProject = computed(() => {
      const total =
        activeProjects.value.active +
        activeProjects.value.completed +
        activeProjects.value.pending;
      return total > 0
        ? ((activeProjects.value.completed / total) * 100).toFixed(0)
        : 0;
    });

    const completedPercentTask = computed(() => {
      const total =
        activeTasks.value.active +
        activeTasks.value.completed +
        activeTasks.value.testing;
      return total > 0
        ? ((activeTasks.value.completed / total) * 100).toFixed(0)
        : 0;
    });

    const completedPercentMember = computed(() => {
      const total = totalMembers.value.total;
      return total > 0
        ? ((totalMembers.value.working / total) * 100).toFixed(0)
        : 0;
    });

    fetchData();
    return {
      activeProjects,
      activeTasks,
      totalMembers,
      isLoading,
      isLoaded,
      completedPercentProject,
      completedPercentTask,
      completedPercentMember,
    };
  },
});
</script>

<style scoped>
.dot-flashing {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}
.dot-flashing::before,
.dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}
.dot-flashing::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 0s;
}
.dot-flashing::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 1s;
}
@keyframes dot-flashing {
  0% {
    background-color: #9880ff;
  }
  50%,
  100% {
    background-color: rgba(152, 128, 255, 0.2);
  }
}
</style>
