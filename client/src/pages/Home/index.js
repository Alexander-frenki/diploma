import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components";
import { CATEGORIES_PATHS } from "../../constants/categories";
import {
  Alimony,
  CarFine,
  CarInfo,
  CompanyInfo,
  CourtSearch,
  FopInfo,
  ForeignCarInfo,
  Wanted,
} from "./categories";

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

export function Home() {
  const { category } = useParams();
  const CategoryComponent = CATEGORY_COMPONENTS[`/${category}`];
  return <Layout>{category && <CategoryComponent />}</Layout>;
}
