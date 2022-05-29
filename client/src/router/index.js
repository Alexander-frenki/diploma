import React, { useEffect } from "react";
import PropTypes from "prop-types";
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
import { checkAuth } from "../services";

const ActivateAccount = React.lazy(() => import("../pages/ActivateAccount"));
const Home = React.lazy(() => import("../pages/Home"));
const PasswordChange = React.lazy(() => import("../pages/PasswordChange"));
const PasswordRecovery = React.lazy(() => import("../pages/PasswordRecovery"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const SignUp = React.lazy(() => import("../pages/SignUp"));
const UserActivation = React.lazy(() => import("../pages/UserActivation"));
const UserSettings = React.lazy(() => import("../pages/UserSettings"));

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
  homeCategoryWithParam: {
    pathname: "/:category/:id",
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
  activateAccount: {
    pathname: "/activate/:activationLink",
    Component: ActivateAccount,
    isProtected: true,
  },
  userSettings: {
    pathname: "/user-settings",
    Component: UserSettings,
    isProtected: true,
  },
  passwordChange: {
    pathname: "/password-change",
    Component: PasswordChange,
    isProtected: true,
  },
  passwordRecovery: {
    pathname: "/password-recovery",
    Component: PasswordRecovery,
    isProtected: false,
  },
  passwordRecoveryToken: {
    pathname: "/password-recovery/:token",
    Component: PasswordRecovery,
    isProtected: false,
  },
};

function LoadableComponent({ component: Component }) {
  return (
    <React.Suspense fallback="">
      <Component />
    </React.Suspense>
  );
}

export function RouterSwitch() {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useSetRecoilState(userSelector);
  const { addAction, removeAction } = useLoader();

  const isEnterPath = [
    ROUTES.signIn.pathname,
    ROUTES.signOut.pathname,
    ROUTES.passwordRecovery.pathname,
    ROUTES.passwordRecoveryToken.pathname,
  ].some((path) => matchPath({ path, exact: true }, location.pathname));

  const isActivatePath = matchPath(
    { path: ROUTES.activateAccount.pathname, exact: true },
    location.pathname
  );

  useEffect(() => {
    (async function () {
      try {
        addAction("REFRESH");
        const { user, accessToken } = await checkAuth();
        localStorage.setItem("token", accessToken);
        setUser(user);
        if (!user.isActivated && !isActivatePath)
          navigate(ROUTES.userActivation.pathname);
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
        <Route
          key={pathname}
          path={pathname}
          element={<LoadableComponent component={Component} />}
        />
      ))}
    </Routes>
  );
}

LoadableComponent.propTypes = {
  component: PropTypes.object,
};
