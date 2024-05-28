<template>
  <StatsItem />
  <div class="row">
    <div class="col-xxl-7 col-xxxl-8">
      <TaskOverview />
      <div class="row">
        <div class="col-lg-6 col-md-12">
          <ProjectDistribution />
        </div>
        <div class="col-lg-6 col-md-12">
          <ToDoList />
        </div>
      </div>
    </div>
    <div class="col-xxl-5 col-xxxl-4">
      <WorkingSchedule />
    </div>
  </div>
  <ProjectStats />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import StatsItem from "../../components/Dashboard/StatsItem.vue";
import TaskOverview from "../../components/Dashboard/TaskOverview.vue";
import ProjectDistribution from "../../components/Dashboard/ProjectDistribution.vue";
import WorkingSchedule from "../../components/Dashboard/WorkingSchedule/index.vue";
import ProjectStats from "../../components/Dashboard/ProjectStats/index.vue";
import ToDoList from "../../components/Dashboard/ToDoList/index.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    StatsItem,
    TaskOverview,
    ProjectDistribution,
    WorkingSchedule,
    ProjectStats,
    ToDoList,
  },
});
</script>