<template>
  <div class="card mb-25 border-0 rounded-0 bg-white">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <div
          class="mb-15 mb-md-25 d-sm-flex align-items-center justify-content-between"
      >
        <h5 class="card-title fw-bold mb-0">Project Stats</h5>
      </div>
      <div class="table-responsive">
        <loader-component v-if="isLoading" style="margin:10% auto"/>
        <table class="table text-nowrap align-middle mb-0" v-if="isLoaded">
          <thead>
          <tr>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
            >
              PROJECT
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              TYPE
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              START DATE
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              DUE DATE
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              PROGRESS
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              STATUS
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
            ></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="stat in stats" :key="stat.id">
            <th
                class="shadow-none title lh-1 fw-medium fs-md-15 fs-lg-16 ps-0"
            >
              <div class="d-flex align-items-center">
                <img
                    :src="require(`../../../assets/images/${stat.image}`)"
                    width="37"
                    height="37"
                    class="rounded-1 me-10"
                    alt="project-image"
                />
                <span class="d-block">{{ stat.title }}</span>
              </div>
            </th>
            <td class="shadow-none lh-1 fw-bold text-body-tertiary">
              {{ stat.type }}
            </td>
            <td class="shadow-none lh-1 fw-bold text-body-tertiary">
              {{ stat.startDate }}
            </td>
            <td class="shadow-none lh-1 fw-bold text-body-tertiary">
              {{ stat.dueDate }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-body-tertiary">
              <div
                  class="progress"
                  role="progressbar"
                  :aria-valuenow="stat.progress"
                  aria-valuemin="0"
                  aria-valuemax="100"
              >
                <div
                    class="progress-bar"
                    :style="{ width: stat.progress + '%' }"
                ></div>
              </div>
            </td>
            <td class="shadow-none lh-1 fw-medium">
                <span :class="['badge fs-13', stat.class]">{{
                    stat.status
                  }}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import projectStats from "./projectStats.json";
import LoaderComponent from "@/components/Layouts/Loader.vue";

export default defineComponent({
  name: "ProjectStats",
  components: {
    LoaderComponent,
  },
  data() {
    const isLoading = ref(true);
    const isLoaded = ref(false);

    const fetchData = () => {
      setTimeout(() => {
        isLoading.value = false;
        isLoaded.value = true;
      }, 100);
    }

    fetchData();
    return {
      stats: projectStats,
      isLoading,
      isLoaded,
    };
  },
});
</script>