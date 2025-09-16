// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  base_url: 'http://162.19.66.250:6892',
  websocket_base_url: 'wss://int.api.expednow.com',
  api_version: '/api/v1',
  keycloak: {
    url: 'https://int.auth.expednow.com',
    realm: 'EXPEDNOW',
    client_id: 'expednow-admin-angular'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
