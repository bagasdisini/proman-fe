<template>
  <div class="card mb-25 border-0 rounded-0 bg-white">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <div
        class="mb-15 mb-md-25 d-sm-flex align-items-center justify-content-between"
      >
        <h5 class="card-title fw-bold mb-0">Project Stats</h5>
      </div>
      <div class="table-responsive">
        <loader-component v-if="isLoading" style="margin: 10% auto" />
        <table
          class="table text-nowrap align-middle mb-0"
          v-if="isLoaded && projects.length"
        >
          <thead>
            <tr>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
              >
                PROJECT
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                TYPE
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                START DATE
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                DUE DATE
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                PROGRESS
              </th>
              <th
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project._id">
              <th
                class="shadow-none title lh-1 fw-medium fs-md-15 fs-lg-16 ps-0"
              >
                <div class="d-flex align-items-center">
                  <img
                    v-if="project.logo"
                    :src="project.logo"
                    width="37"
                    height="37"
                    class="rounded-1 me-10"
                    alt="project-image"
                  />
                  <span class="d-block">{{ project.name }}</span>
                </div>
              </th>
              <td class="shadow-none lh-1 fw-bold text-body-tertiary">
                {{ project.type }}
              </td>
              <td class="shadow-none lh-1 fw-bold text-body-tertiary">
                {{ formatDate(project.start_date) }}
              </td>
              <td class="shadow-none lh-1 fw-bold text-body-tertiary">
                {{ formatDate(project.end_date) }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary">
                <div
                  class="progress"
                  role="progressbar"
                  :aria-valuenow="getProgress(project)"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    class="progress-bar"
                    :style="{ width: getProgress(project) + '%' }"
                  ></div>
                </div>
              </td>
              <td class="shadow-none lh-1 fw-medium">
                <span
                  :class="['badge fs-13', getStatusClass(project.status)]"
                  >{{ project.status }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="pagination-area d-md-flex mt-15 mt-md-25 mb-0 justify-content-between align-items-center"
      >
        <p class="mb-0 text-paragraph"></p>
        <nav class="mt-15 mt-md-0">
          <ul class="pagination mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="changePage(currentPage - 1)">
                <i class="flaticon-chevron-1"></i>
              </button>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item">
              <button
                class="page-link"
                :class="{ active: currentPage === page }"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
            >
              <button class="page-link" @click="changePage(currentPage + 1)">
                <i class="flaticon-chevron"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { API, setAuthToken } from "@/api";
import LoaderComponent from "@/components/Layouts/Loader.vue";

export default defineComponent({
  name: "ProjectStats",
  components: {
    LoaderComponent,
  },
  setup() {
    const isLoading = ref(true);
    const isLoaded = ref(false);
    const projects = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const totalProjects = ref(0);

    const fetchProjects = async (page = 1) => {
      isLoading.value = true;
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          setAuthToken(token);

          const response = await API.get(
            `/me/projects?sort=asc&page=${page}&limit=5`
          );
          const { result, total, pages } = response.data;

          projects.value = result;
          totalProjects.value = total;
          totalPages.value = pages;
          currentPage.value = page;
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        isLoading.value = false;
        isLoaded.value = true;
      }
    };

    const formatDate = (dateStr: string) => {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const getProgress = (project: any) => {
      const { active, testing, completed } = project.task_count;
      const totalTasks = active + testing + completed;
      return totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;
    };

    const getStatusClass = (status: string) => {
      const statusMap: Record<string, string> = {
        active: "text-outline-primary",
        pending: "text-outline-danger",
        completed: "text-outline-success",
      };
      return statusMap[status] || "text-outline-secondary";
    };

    const changePage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        fetchProjects(page);
      }
    };

    onMounted(() => {
      fetchProjects();
    });

    return {
      isLoading,
      isLoaded,
      projects,
      currentPage,
      totalPages,
      totalProjects,
      formatDate,
      getProgress,
      getStatusClass,
      changePage,
    };
  },
});
</script>
