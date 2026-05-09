import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'project/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'brandspecific/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'detials/:id/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'categorydeitales/:id/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'productSubCatgory/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
