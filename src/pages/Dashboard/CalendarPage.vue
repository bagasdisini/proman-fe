<template>
  <div class="row">
    <div class="col-xxxl-8">
      <div class="card mb-25 border-0 rounded-0 bg-white calendar-card">
        <div class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing">
          <div id="calendar"></div>
        </div>
      </div>
    </div>
    <div class="col-xxxl-4">
      <WorkingSchedule />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import WorkingSchedule from "@/components/Dashboard/WorkingSchedule.vue";

onMounted(() => {
  {
    WorkingSchedule;
  }
  const todayDate = new Date().toISOString().slice(0, 10);
  const calendarEl = document.getElementById("calendar");
  if (calendarEl) {
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      initialDate: todayDate,
      navLinks: true,
      editable: true,
      dayMaxEvents: true,
      events: [
        {
          title: "All Day Event",
          start: "2024-03-27",
        },
        {
          title: "Long Event",
          start: "2024-03-01",
          end: "2024-03-03",
        },
        {
          title: "Repeating Event",
          start: "2024-03-14T16:00:00",
        },
        {
          title: "Conference",
          start: "2024-03-09",
        },
        {
          title: "Meeting",
          start: "2024-03-17T10:30:00",
          end: "2024-03-18T12:30:00",
        },
        {
          title: "Meeting",
          start: "2024-03-14T14:30:00",
        },
        {
          title: "Happy Hour",
          start: "2024-03-27T17:30:00",
        },
        {
          title: "Long Event",
          start: "2024-03-04",
          end: "2024-03-10",
        },
      ],
    });
    calendar.render();
  }
});
</script>
