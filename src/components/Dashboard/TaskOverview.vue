<template>
  <div class="card mb-25 border-0 rounded-0 bg-white">
    <div class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing">
      <div class="d-sm-flex align-items-center justify-content-between">
        <h5 class="card-title fw-bold mb-0">Task Overview</h5>
      </div>
      <div id="taskOverviewChart" class="chart">
        <apexchart
            type="bar"
            height="370"
            :options="taskOverviewChart"
            :series="task"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

interface TaskData {
  name: string;
  data: number[];
}

export default defineComponent({
  name: "TaskOverview",
  data: function () {
    return {
      task: [] as TaskData[],
      taskOverviewChart: {
        chart: {
          type: "bar",
          height: 370,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "24%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#6560F0"],
        stroke: {
          show: false,
        },
        xaxis: {
          categories: [
            "17 Dec - 23 Dec",
            "28 Jan - 3 Feb",
            "4 Feb - 10 Feb",
            "11 Feb - 17 Feb",
            "18 Feb - 24 Feb",
            "25 Feb - 03 Mar",
            "03 Mar - 09 Mar",
            "10 Mar - 16 Mar",
          ],
          labels: {
            show: true,
            style: {
              fontFamily: "Red Hat Display, sans-serif",
              colors: "#9C9AB6",
              fontSize: "14px",
              fontWeight: 500,
            },
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        yaxis: {
          show: true,
          tickAmount: 6,
          labels: {
            show: true,
            style: {
              fontFamily: "Red Hat Display, sans-serif",
              colors: ["#9C9AB6"],
              fontSize: "14px",
              fontWeight: 500,
            },
          },
          axisBorder: {
            show: true,
            color: "#eee",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          style: {
            fontSize: "14px",
            fontFamily: "Red Hat Display, sans-serif",
          },
        },
        grid: {
          show: true,
          strokeDashArray: 5,
          borderColor: "#d9e9ef",
        },
      },
    };
  },
  mounted() {
    // Simulate API call
    setTimeout(() => {
      // Fetch data from API
      this.task = [
        {
          name: "This Week",
          data: [250, 200, 1000, 150, 190, 350, 220, 180],
        },
      ];
    }, 2000); // Assuming API call takes 2 seconds
  },
});
</script>