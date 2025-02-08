<template>
  <div class="custom-card mb-25 border-0 rounded-0 bg-white">
    <div
      class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing"
      :style="{ height: isLoaded ? 'auto' : '446px' }"
    >
      <div class="mb-15 d-flex align-items-center justify-content-between">
        <h5 class="card-title fw-bold mb-0">Project Distribution</h5>
      </div>
      <div id="projectDistributionChart" class="chart">
        <loader-component v-if="isLoading" style="margin: 35% auto" />
        <apexchart
          type="donut"
          height="382"
          :options="projectDistributionChart"
          :series="distribution"
          v-if="isLoaded"
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

    const projectColors: Record<string, string> = {
      frontend: "#F1421B",
      backend: "#6560F0",
      mobile: "#06B48A",
      desktop: "#6FD3F7",
      monitor: "#FFB400",
      tool: "#ee00ff",
      etc: "#463e3e",
    };

    const fetchData = async () => {
      try {
        const response = await API.get("/me/project/count/type");

        if (response.data && Array.isArray(response.data)) {
          distribution.value = response.data.map((item) => item.total);
          labels.value = response.data.map((item) => item.type);
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

    return { distribution, isLoading, isLoaded, projectDistributionChart };
  },
});
</script>
