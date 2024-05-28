<template>
  <div class="custom-card mb-25 border-0 rounded-0 bg-white">
    <div class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing" :style="{ height: isLoaded ? 'auto' : '446px' }">
      <div class="mb-15 d-flex align-items-center justify-content-between">
        <h5 class="card-title fw-bold mb-0">Project Distribution</h5>
      </div>
      <div id="projectDistributionChart" class="chart" >
        <loader-component v-if="isLoading" style="margin: 35% auto"/>
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
import {defineComponent, ref} from "vue";

import LoaderComponent from "../Layouts/Loader.vue";

interface Data {
  distribution: number[];
  labels: string[];
}

export default defineComponent({
  name: "ProjectDistribution",
  components: {
    LoaderComponent,
  },
  data: function () {
    const data: Data = {
      distribution: [35, 41, 45, 50],
      labels: ["Design", "Frontend", "Backend", "Testing"],
    };
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
      distribution: data.distribution,
      isLoading,
      isLoaded,
      projectDistributionChart: {
        labels: data.labels,
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
        colors: ["#F1421B", "#06B48A", "#6560F0", "#6FD3F7"],
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
      },
    };
  },
});
</script>