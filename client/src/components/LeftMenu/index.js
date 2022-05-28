import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil";
import {
  alpha,
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import FolderOpen from "@mui/icons-material/FolderOpen";
import Folder from "@mui/icons-material/Folder";
import Paid from "@mui/icons-material/Paid";
import Gavel from "@mui/icons-material/Gavel";
import MenuIcon from "@mui/icons-material/Menu";
import MoneyOff from "@mui/icons-material/MoneyOff";
import Search from "@mui/icons-material/Search";
import Map from "@mui/icons-material/Map";
import { CATEGORIES_PATHS } from "../../constants/categories";

const MENU_ITEMS = {
  company: {
    title: "Компанії та ФОП",
    items: [
      {
        text: "Реєстраційна інформація компанії",
        Icon: Folder,
        pathname: CATEGORIES_PATHS.companyInfo,
      },
      {
        text: "Реєстраційна інформація ФОП",
        Icon: FolderOpen,
        pathname: CATEGORIES_PATHS.fopInfo,
      },
    ],
  },
  car: {
    title: "Авто",
    items: [
      {
        text: "Інформація про авто",
        Icon: DirectionsCar,
        pathname: CATEGORIES_PATHS.carInfo,
      },
      {
        text: "Штрафи",
        Icon: Paid,
        pathname: CATEGORIES_PATHS.carFine,
      },
      {
        text: "Пошук на іноземних ресурсах",
        Icon: Map,
        pathname: CATEGORIES_PATHS.foreignCarInfo,
      },
    ],
  },
  court: {
    title: "Судовий реєстр",
    items: [
      {
        text: "Пошук судових рішень",
        Icon: Gavel,
        pathname: CATEGORIES_PATHS.courtSearch,
      },
    ],
  },
  physical: {
    title: "Фізичні особи",
    items: [
      {
        text: "Заборгованість по аліментах",
        pathname: CATEGORIES_PATHS.alimony,
        Icon: MoneyOff,
      },
      {
        text: "Пошук в базі людей в розшуку",
        Icon: Search,
        pathname: CATEGORIES_PATHS.wanted,
      },
    ],
  },
};

function UserInfo({ isDesktop }) {
  const { firstName, lastName, email } = useRecoilValue(userState);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 2,
        py: [0, 0, 2],
        bgcolor: (theme) => isDesktop && theme.palette.primary.dark,
      }}
    >
      {isDesktop && (
        <Box>
          <Typography variant="h6">
            {firstName} {lastName}
          </Typography>
          <Typography align="center" sx={{ fontSize: 10 }}>
            {email}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

function Menu({ isDesktop, isOpen, close }) {
  const { pathname: currentPathname } = useLocation();

  const navigate = useNavigate();
  return (
    <MenuList
      sx={{
        mt: [0, 0, 1],
        py: [0, 0, 1],
      }}
    >
      {Object.values(MENU_ITEMS).map(({ title, items }) => (
        <Box
          key={title}
          sx={{
            mb: 1,
          }}
        >
          {isDesktop && (
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                mb: 1,
              }}
            >
              {title}
            </Typography>
          )}
          {items.map(({ text, Icon, pathname }) => (
            <MenuItem
              onClick={() => {
                navigate(pathname);
                close();
              }}
              key={text}
              sx={{
                borderRadius: 2,
                py: 2,
                px: [0, 0, 2],
                justifyContent: [
                  isOpen ? "flex-start" : "center",
                  isOpen ? "flex-start" : "center",
                  "flex-start",
                ],
                bgcolor: (theme) =>
                  currentPathname.includes(pathname)
                    ? theme.palette.primary.dark
                    : "transparent",
                "&:hover": {
                  bgcolor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  ...(!isDesktop && { width: 54 }),
                  justifyContent: ["center"],
                }}
              >
                <Icon />
              </ListItemIcon>

              <ListItemText
                disableTypography
                sx={{
                  fontSize: 14,
                  opacity: isDesktop || isOpen ? 1 : 0,
                  pointerEvents: !isOpen ? "none" : "all",
                  transition: isOpen ? "opacity 0.5s 0.35s" : "opacity 0s 0s",
                }}
              >
                {text}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      ))}
    </MenuList>
  );
}

export function LeftMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(document.body.offsetWidth > 991);
  const isFullShown = isOpen || isDesktop;

  useEffect(() => {
    window.addEventListener("resize", () =>
      setIsDesktop(document.body.offsetWidth > 991)
    );
    () => {
      window.removeEventListener("resize", () =>
        setIsDesktop(document.body.offsetWidth > 991)
      );
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          width: isFullShown ? 320 : 54,
          position: ["absolute", "absolute", "static"],
          zIndex: 10,
          bgcolor: (theme) => theme.contentBackground,
          transition: "width 0.35s ease-in",
          height: 1,
          ...(isOpen && { pr: 1 }),
          borderRight: (theme) =>
            isOpen && `2px solid ${theme.palette.background.paper}`,
        }}
      >
        <Box
          sx={{
            display: ["flex", "flex", "none"],
            py: 2,
            width: 54,
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon />
        </Box>
        <UserInfo isOpen={isOpen} isDesktop={isDesktop} />
        <Menu
          isOpen={isOpen}
          isDesktop={isDesktop}
          close={() => setIsOpen(false)}
        />
      </Box>

      <Box
        onClick={() => setIsOpen(false)}
        sx={{
          zIndex: 10,
          position: "fixed",
          top: 56,
          width: 1,
          height: 1,
          left: 326,
          pointerEvents: !isOpen ? "none" : "all",
          bgcolor: isOpen
            ? (theme) => alpha(theme.palette.background.paper, 0.8)
            : "transparent",
          transition: isOpen
            ? "background-color 0.4s 0.4s"
            : "background-color 0s 0s",
        }}
      />
    </>
  );
}

UserInfo.propTypes = {
  isOpen: PropTypes.bool,
  isDesktop: PropTypes.bool,
};

Menu.propTypes = {
  isOpen: PropTypes.bool,
  isDesktop: PropTypes.bool,
  close: PropTypes.func,
};
