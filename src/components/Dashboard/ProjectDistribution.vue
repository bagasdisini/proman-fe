<template>
  <div class="custom-card mb-25 border-0 rounded-0 bg-white">
    <div
      :style="{ height: isLoaded ? '445px' : '445px' }"
      class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing"
    >
      <div class="mb-15 d-flex align-items-center justify-content-between">
        <h5 class="card-title fw-bold mb-0">Project Distribution</h5>
      </div>

      <div id="projectDistributionChart" class="chart">
        <div
          v-if="!isHaveData && !isLoading"
          class="text-center text-muted fw-bold text-dark-emphasis"
          style="font-size: medium; margin: 35% auto"
        >
          There is no project that has been created yet.
        </div>
        <loader-component v-if="isLoading" style="margin: 35% auto" />
        <apexchart
          v-if="isLoaded && isHaveData"
          :options="projectDistributionChart"
          :series="distribution"
          height="382"
          type="donut"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { API } from "@/api";
import LoaderComponent from "../Layouts/Loader.vue";

export default defineComponent({
  name: "ProjectDistribution",
  components: {
    LoaderComponent,
  },
  setup() {
    const distribution = ref<number[]>([]);
    const labels = ref<string[]>([]);
    const isLoading = ref(true);
    const isLoaded = ref(false);
    const isHaveData = computed(() => distribution.value.length > 0);

    const projectColors: Record<string, string> = {
      Frontend: "#F1421B",
      Backend: "#6560F0",
      Mobile: "#06B48A",
      Desktop: "#6FD3F7",
      Monitor: "#FFB400",
      Tool: "#ee00ff",
      Etc: "#463e3e",
    };

    function toTitleCase(str) {
      return str.replace(
        /\w\S*/g,
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
    }

    const fetchData = async () => {
      try {
        const response = await API.get("/me/project/count/type");

        if (response.data && Array.isArray(response.data)) {
          distribution.value = response.data.map((item) => item.total);
          labels.value = response.data.map((item) => toTitleCase(item.type));
        }
      } catch (error) {
        console.error("Error fetching project distribution:", error);
      } finally {
        isLoading.value = false;
        isLoaded.value = true;
      }
    };

    onMounted(fetchData);

    const projectDistributionChart = computed(() => ({
      labels: labels.value,
      chart: {
        type: "donut",
        height: 382,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 4,
      },
      colors: labels.value.map((type) => projectColors[type] || "#CCCCCC"),
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontWeight: 500,
        fontSize: "14px",
        fontFamily: "Red Hat Display, sans-serif",
        labels: {
          colors: "#9C9AB6",
        },
        markers: {
          offsetX: -2,
        },
        itemMargin: {
          horizontal: 8,
          vertical: 5,
        },
      },
      tooltip: {
        style: {
          fontSize: "14px",
          fontFamily: "Red Hat Display, sans-serif",
        },
      },
    }));

    return {
      distribution,
      isLoading,
      isLoaded,
      projectDistributionChart,
      isHaveData,
    };
  },
});
</script>
