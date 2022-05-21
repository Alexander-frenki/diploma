import React, { useEffect } from "react";
import {
  matchPath,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userSelector } from "../recoil";
import { useLoader } from "../hooks";
import { Home, SignIn, SignUp, UserActivation, UserSettings } from "../pages";
import { checkAuth } from "../services";

export const ROUTES = {
  home: {
    pathname: "/",
    Component: Home,
    isProtected: true,
  },
  homeCategory: {
    pathname: "/:category",
    Component: Home,
    isProtected: true,
  },
  signIn: {
    pathname: "/sign-in",
    Component: SignIn,
    isProtected: false,
  },
  signOut: {
    pathname: "/sign-up",
    Component: SignUp,
    isProtected: false,
  },
  userActivation: {
    pathname: "/activation",
    Component: UserActivation,
    isProtected: false,
  },
  userSettings: {
    pathname: "/user-settings",
    Component: UserSettings,
    isProtected: true,
  },
};

export function RouterSwitch() {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useSetRecoilState(userSelector);
  const { addAction, removeAction } = useLoader();

  const isEnterPath = [ROUTES.signIn.pathname, ROUTES.signOut.pathname].some(
    (path) => matchPath({ path, exact: true }, location.pathname)
  );

  useEffect(() => {
    (async function () {
      try {
        addAction("REFRESH");
        const { user, accessToken } = await checkAuth();
        localStorage.setItem("token", accessToken);
        setUser(user);
        if (!user.isActivated) navigate(ROUTES.userActivation.pathname);
        if (isEnterPath) navigate(ROUTES.home.pathname);
      } catch (error) {
        !isEnterPath && navigate(ROUTES.signIn.pathname);
      } finally {
        removeAction("REFRESH");
      }
    })();
  }, []);

  return (
    <Routes>
      {Object.values(ROUTES).map(({ pathname, Component }) => (
        <Route key={pathname} path={pathname} element={<Component />} />
      ))}
    </Routes>
  );
}
