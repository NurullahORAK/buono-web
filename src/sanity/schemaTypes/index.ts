// src/sanity/schemaTypes/index.ts
import siteSettings from './siteSettings';
import homePage from './homePage';
import contactPage from './contactPage';
import faqPage from './faqPage';

import organizationPage from './organizationPage';
import organizationType from './organizationType';

import consultingPage from './consultingPage';
import consultingService from './consultingService';
import referenceItem from './referenceItem';

import category from './category';
import product from './product';
import cakeGroup from './cakeGroup';
import contentPage from './contentPage';

import qualityPage from './qualityPage';
import productionCenterPage from './productionCenterPage';

export const schemaTypes = [
  // singletons
  siteSettings,
  homePage,
  contactPage,
  faqPage,
  organizationPage,
  consultingPage,
  qualityPage,
  productionCenterPage,

  // collections
  category,
  product,
  cakeGroup,
  organizationType,
  consultingService,
  referenceItem,
  contentPage,
];
