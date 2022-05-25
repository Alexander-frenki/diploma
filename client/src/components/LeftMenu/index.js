import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil";
import {
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
import Receipt from "@mui/icons-material/Receipt";
// import MoneyOff from "@mui/icons-material/MoneyOff";
// import Search from "@mui/icons-material/Search";
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
        text: "Інформація по штрафам",
        Icon: Paid,
        pathname: CATEGORIES_PATHS.carFine,
      },
      {
        text: "Пошук на іноземних площадках",
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
      {
        text: "Пошук судового документа",
        Icon: Receipt,
        pathname: CATEGORIES_PATHS.courtDoc,
      },
    ],
  },
  // physical: {
  //   title: "Фізичні особи",
  //   items: [
  //     {
  //       text: "Заборгованість по аліментах",
  //       Icon: MoneyOff,
  //     },
  //     {
  //       text: "Пошук в базі людей в розшуку",
  //       Icon: Search,
  //     },
  //   ],
  // },
};

function UserInfo() {
  const { firstName, lastName, email } = useRecoilValue(userState);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 2,
        py: 2,
        bgcolor: (theme) => theme.palette.primary.dark,
      }}
    >
      <Typography variant="h6">
        {firstName} {lastName}
      </Typography>
      <Typography sx={{ fontSize: 10 }}>{email}</Typography>
    </Box>
  );
}

function Menu() {
  const { pathname: currentPathname } = useLocation();

  const navigate = useNavigate();
  return (
    <MenuList
      sx={{
        mt: 1,
      }}
    >
      {Object.values(MENU_ITEMS).map(({ title, items }) => (
        <Box
          key={title}
          sx={{
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
          {items.map(({ text, Icon, pathname }) => (
            <MenuItem
              onClick={() => navigate(pathname)}
              key={text}
              sx={{
                borderRadius: 2,
                py: 2,
                bgcolor: (theme) =>
                  currentPathname.includes(pathname)
                    ? theme.palette.primary.dark
                    : "transparent",
                "&:hover": {
                  bgcolor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                sx={{
                  fontSize: 14,
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
  return (
    <Box>
      <UserInfo />
      <Menu />
    </Box>
  );
}
