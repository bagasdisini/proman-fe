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

  <div v-if="showEventModal" class="event-modal" @click.self="closeModal">
    <div class="event-modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <h3>{{ toTitleCase(selectedEvent?.title) }}</h3>
      <p>
        <strong>Description:</strong>
        {{ selectedEvent?.extendedProps?.description }}
      </p>
      <p>
        <strong>Type:</strong>
        {{ toTitleCase(selectedEvent?.extendedProps?.type) }}
      </p>
      <p>
        <strong>Contributor(s):</strong>
        {{ selectedEvent?.extendedProps?.contributor?.join(", ") }}
      </p>
      <p><strong>Starts:</strong> {{ selectedEvent?.startTime }}</p>
      <p><strong>Ends:</strong> {{ selectedEvent?.endTime }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Calendar, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { API, setAuthToken } from "@/api";

import WorkingSchedule from "@/components/Dashboard/WorkingSchedule.vue";

const calendarInstance = ref<Calendar | null>(null);
const showEventModal = ref(false);
const selectedEvent = ref<any>(null);

const toTitleCase = (str: string | undefined | null) => {
  if (!str) return "";
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

const closeModal = () => {
  showEventModal.value = false;
};

const closeAllFullCalendarPopovers = () => {
  const popovers = document.querySelectorAll(".fc-popover");
  popovers.forEach((popover) => {
    (popover as HTMLElement).style.display = "none";
  });
};

onMounted(() => {
  const calendarEl = document.getElementById("calendar");
  if (calendarEl) {
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      initialDate: new Date().toISOString().slice(0, 10),
      navLinks: true,
      eventTimeFormat: {
        hour: "numeric",
        minute: "2-digit",
        meridiem: "short",
      },
      editable: true,
      dayMaxEvents: 1,
      events: async function (fetchInfo, successCallback, failureCallback) {
        const token = localStorage.getItem("jwt");
        if (!token) {
          console.error("JWT token not found.");
          failureCallback(new Error("Authentication token not found."));
          return;
        }
        setAuthToken(token);
        try {
          const response = await API.get(
            `/me/schedules?start=${fetchInfo.start.getTime()}&end=${fetchInfo.end.getTime()}`
          );

          if (response.data) {
            const fullCalendarEvents = response.data.map((schedule: any) => {
              const event: any = {
                id: schedule.id,
                title: schedule.name,
                startRecur: schedule.start_date,
                endRecur: schedule.end_date,
                startTime: schedule.start_time,
                endTime: schedule.end_time,

                start: `${schedule.start_date.slice(0, 10)}T${
                  schedule.start_time
                }`,
                end: `${schedule.end_date.slice(0, 10)}T${schedule.end_time}`,
                extendedProps: {
                  contributor: schedule.contributor,
                  description: schedule.description,
                  type: schedule.type,
                  createdAt: schedule.created_at,
                  originalStartDate: schedule.start_date,
                  originalEndDate: schedule.end_date,
                  startTime: schedule.start_time,
                  endTime: schedule.end_time,
                  daysOfWeek: schedule.daysOfWeek,
                },
              };
              return event;
            });
            successCallback(fullCalendarEvents);
          } else {
            successCallback([]);
          }
        } catch (error) {
          failureCallback(error as Error);
        }
      },
      eventClick: function (clickInfo: EventClickArg) {
        closeAllFullCalendarPopovers();

        selectedEvent.value = {
          id: clickInfo.event.id,
          title: clickInfo.event.title,
          allDay: clickInfo.event.allDay,
          startRecur: clickInfo.event.extendedProps.originalStartDate,
          endRecur: clickInfo.event.extendedProps.originalEndDate,
          startTime: clickInfo.event.extendedProps.startTime,
          endTime: clickInfo.event.extendedProps.endTime,
          daysOfWeek:
            clickInfo.event.extendedProps.daysOfWeek ||
            (clickInfo.event.allDay ? undefined : clickInfo.event.daysOfWeek),
          extendedProps: clickInfo.event.extendedProps,
        };
        showEventModal.value = true;
      },
    });
    calendar.render();
    calendarInstance.value = calendar;
  }
});
</script>

<style scoped>
.event-modal {
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.event-modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 25px;
  border: 1px solid #888;
  width: 90%;
  max-width: 550px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  line-height: 1.6;
}

.event-modal-content h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}
.event-modal-content p {
  margin-bottom: 10px;
  color: #555;
}
.event-modal-content p strong {
  color: #333;
}

.close-button {
  color: #777;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 30px;
  font-weight: bold;
  line-height: 1;
}

.close-button:hover,
.close-button:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
