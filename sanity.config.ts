import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import { apiVersion, dataset, projectId } from './src/sanity/env';
import { structure } from './src/sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

// singleton ayarları
const singletonTypes = new Set(['siteSettings', 'organizationPage', 'consultingPage']);
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,

  plugins: [deskTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
