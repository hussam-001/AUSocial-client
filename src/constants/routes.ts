import NewPostModal from "@/modals/NewPostModal";
import PostModal from "@/modals/PostModal";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import UserPage from "@/pages/UserPage";

export const PAGES = {
  HOME: {
    path: "/home",
    component: HomePage,
    authGuard: true,
  },
  USER_PAGE: {
    path: (username: string) => `/user/${username ?? ":username"}`,
    component: UserPage,
    authGuard: true,
  },
  SIGN_IN: {
    path: "/sign-in",
    component: SignInPage,
    exact: true,
  },
  SIGN_UP: {
    path: "/sign-up",
    component: SignUpPage,
    exact: true,
  },
  ERROR: {
    path: "/error",
    component: ErrorPage,
    exact: true,
  },
};

export const MODALS: any = {
  NEW_POST: {
    key: "NEW_POST",
    component: NewPostModal,
  },
  POST: {
    key: "POST",
    component: PostModal,
  },
};
