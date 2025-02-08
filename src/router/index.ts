import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/Authentication/LoginPage.vue";
import RegisterPage from "../pages/Authentication/RegisterPage.vue";
import ForgotPasswordPage from "../pages/Authentication/ForgotPasswordPage.vue";
import HomePage from "../pages/Dashboard/HomePage.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
    meta: { guestPage: true },
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
    meta: { guestPage: true },
  },
  {
    path: "/forgot-password",
    name: "ForgotPasswordPage",
    component: ForgotPasswordPage,
    meta: { guestPage: true },
  },
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/project-list",
    name: "ProjectListPage",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/task-list",
    name: "TaskListPage",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/member-list",
    name: "MemberListPage",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/calendar",
    name: "CalendarPage",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/change-profile",
    name: "ChangeProfile",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    component: HomePage,
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("jwt");

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next({ name: "LoginPage" });
  } else if (
    to.matched.some((record) => record.meta.requiresGuest) &&
    isAuthenticated
  ) {
    next({ name: "HomePage" });
  } else {
    next();
  }
});

export default router;
