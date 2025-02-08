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
import { defineComponent, ref, onMounted } from "vue";
import { API, setAuthToken } from "@/api";

interface TaskData {
  name: string;
  data: number[];
}

export default defineComponent({
  name: "TaskOverview",
  setup() {
    const task = ref<TaskData[]>([]);
    const categories = ref<string[]>([]);

    const taskOverviewChart = ref({
      chart: {
        type: "bar",
        height: 370,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: { columnWidth: "24%" },
      },
      dataLabels: { enabled: false },
      colors: ["#6560F0"],
      stroke: { show: false },
      xaxis: {
        categories: categories.value,
        labels: {
          show: true,
          style: {
            fontFamily: "Red Hat Display, sans-serif",
            colors: "#9C9AB6",
            fontSize: "14px",
            fontWeight: 500,
          },
        },
        axisTicks: { show: false },
        axisBorder: { show: false },
      },
      yaxis: {
        show: true,
        tickAmount: 10,
        labels: {
          show: true,
          style: {
            fontFamily: "Red Hat Display, sans-serif",
            colors: ["#9C9AB6"],
            fontSize: "14px",
            fontWeight: 500,
          },
        },
        axisBorder: { show: true, color: "#eee" },
      },
      fill: { opacity: 1 },
      tooltip: {
        style: {
          fontSize: "14px",
          fontFamily: "Red Hat Display, sans-serif",
        },
        y: {
          formatter: (val: number) => Math.round(val),
        },
      },
      grid: {
        show: true,
        strokeDashArray: 5,
        borderColor: "#d9e9ef",
      },
    });

    const fetchTaskOverview = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          setAuthToken(token);
        }

        const response = await API.get("/me/task/overview");

        categories.value = response.data.map((item: any) => `${item.start} - ${item.end}`);
        const counts = response.data.map((item: any) => item.count);

        task.value = [{ name: "This Week", data: counts }];

        taskOverviewChart.value = { ...taskOverviewChart.value, xaxis: { ...taskOverviewChart.value.xaxis, categories: categories.value } };
      } catch (error) {
        console.error("Error fetching task overview:", error);
      }
    };

    onMounted(fetchTaskOverview);

    return { task, taskOverviewChart };
  },
});
</script>