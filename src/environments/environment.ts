// Development: Angular dev server proxies /api to localhost:3000
// or you can run the Express server separately on port 3000
export const environment = {
  production: false,
  apiUrl: '',  // empty = relative URL, works with proxy or same-origin
};
