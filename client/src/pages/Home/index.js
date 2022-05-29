import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { Layout } from "../../components";
import { CATEGORIES_PATHS } from "../../constants/categories";

const Alimony = React.lazy(() => import("./categories/Alimony"));
const CarFine = React.lazy(() => import("./categories/CarFine"));
const CarInfo = React.lazy(() => import("./categories/CarInfo"));
const CompanyInfo = React.lazy(() => import("./categories/CompanyInfo"));
const CourtSearch = React.lazy(() => import("./categories/CourtSearch"));
const FopInfo = React.lazy(() => import("./categories/FopInfo"));
const ForeignCarInfo = React.lazy(() => import("./categories/ForeignCarInfo"));
const Wanted = React.lazy(() => import("./categories/Wanted"));

export const CATEGORY_COMPONENTS = {
  [CATEGORIES_PATHS.carInfo]: CarInfo,
  [CATEGORIES_PATHS.carFine]: CarFine,
  [CATEGORIES_PATHS.companyInfo]: CompanyInfo,
  [CATEGORIES_PATHS.fopInfo]: FopInfo,
  [CATEGORIES_PATHS.foreignCarInfo]: ForeignCarInfo,
  [CATEGORIES_PATHS.courtSearch]: CourtSearch,
  [CATEGORIES_PATHS.alimony]: Alimony,
  [CATEGORIES_PATHS.wanted]: Wanted,
};

export default function Home() {
  const { category } = useParams();
  const CategoryComponent = CATEGORY_COMPONENTS[`/${category}`];
  return (
    <Layout>
      {category ? (
        <CategoryComponent />
      ) : (
        <Box
          sx={{
            height: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" align="center">
            Для початку пошуку виберіть категорію
          </Typography>
          <Search
            sx={{
              width: 150,
              height: 150,
              mt: 2,
            }}
            color="disabled"
          />
        </Box>
      )}
    </Layout>
  );
}
