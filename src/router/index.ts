import { createWebHistory, createRouter } from "vue-router";

import LoginPage from "../pages/Authentication/LoginPage.vue";
import RegisterPage from "../pages/Authentication/RegisterPage.vue";
import ForgotPasswordPage from "../pages/Authentication/ForgotPasswordPage.vue";
import HomePage from "../pages/Dashboard/HomePage.vue";

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  },
  {
    path: "/forgot-password",
    name: "ForgotPasswordPage",
    component: ForgotPasswordPage,
  },
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/project-list",
    name: "ProjectListPage",
    component: HomePage,
  },
  {
    path: "/task-list",
    name: "TaskListPage",
    component: HomePage,
  },
  {
    path: "/member-list",
    name: "MemberListPage",
    component: HomePage,
  },
  {
    path: "/calendar",
    name: "CalendarPage",
    component: HomePage,
  },
  {
    path: "/change-profile",
    name: "ChangeProfile",
    component: HomePage,
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes: routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;