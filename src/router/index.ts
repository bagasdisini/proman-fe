import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/Authentication/LoginPage.vue";
import RegisterPage from "../pages/Authentication/RegisterPage.vue";
import ForgotPasswordPage from "../pages/Authentication/ForgotPasswordPage.vue";
import HomePage from "../pages/Dashboard/HomePage.vue";
import CalendarPage from "@/pages/Dashboard/CalendarPage.vue";
import MemberList from "@/pages/Dashboard/MemberListPage.vue";
import TaskList from "@/pages/Dashboard/TaskListPage.vue";
import ProjectsList from "@/pages/Dashboard/ProjectListPage.vue";
import ProjectDetailPage from "@/pages/Dashboard/ProjectDetailPage.vue";
import ProjectCreatePage from "@/pages/Dashboard/ProjectCreatePage.vue";
import ProfileSettings from "@/pages/User/ChangeProfilePage.vue";
import ChangePassword from "@/pages/User/ChangePasswordPage.vue";
import AddUser from "@/pages/User/AddUser.vue";
import UpdateUser from "@/pages/User/UpdateUser.vue";

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
    component: ProjectsList,
    meta: { requiresAuth: true },
  },
  {
    path: "/project",
    name: "ProjectDetailPage",
    component: ProjectDetailPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/create-new-project",
    name: "ProjectCreatePage",
    component: ProjectCreatePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/task-list",
    name: "TaskListPage",
    component: TaskList,
    meta: { requiresAuth: true },
  },
  {
    path: "/member-list",
    name: "MemberListPage",
    component: MemberList,
    meta: { requiresAuth: true },
  },
  {
    path: "/calendar",
    name: "CalendarPage",
    component: CalendarPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/change-profile",
    name: "ChangeProfile",
    component: ProfileSettings,
    meta: { requiresAuth: true },
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    component: ChangePassword,
    meta: { requiresAuth: true },
  },
  {
    path: "/add-user",
    name: "AddUser",
    component: AddUser,
    meta: { requiresAuth: true },
  },
  {
    path: "/update-user",
    name: "UpdateUser",
    component: UpdateUser,
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
