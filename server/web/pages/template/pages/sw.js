/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "mstile-150x150.png",
    "revision": "5701d873784a3f27c3dffb8a15736079"
  }, {
    "url": "logo.png",
    "revision": "f5db7f222c6f454cdf40c0793ef529f3"
  }, {
    "url": "index.html",
    "revision": "73b041e0c8ba7cfbfabf961b0d9cba76"
  }, {
    "url": "icon.png",
    "revision": "4425f6f2b52d2deaf2374ff63c682bcc"
  }, {
    "url": "favicon.ico",
    "revision": "80c0375465582708d791bcab9b4053af"
  }, {
    "url": "favicon-32x32.png",
    "revision": "d34d53cbac4d729b0f49677fecbb48ac"
  }, {
    "url": "favicon-16x16.png",
    "revision": "1cabe79322b89571937189d95cbe968b"
  }, {
    "url": "dlnaicon-48.png",
    "revision": "94fb147303f8625b3f0dd99a385d72d8"
  }, {
    "url": "dlnaicon-120.png",
    "revision": "a741da374199bad465c9e2576da666d0"
  }, {
    "url": "static/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "static/vendor-BZf9Mo6H.js",
    "revision": null
  }, {
    "url": "static/useTranslation-C5oH9X_x.js",
    "revision": null
  }, {
    "url": "static/useTorrentDetail-QInQu8lh.js",
    "revision": null
  }, {
    "url": "static/useLocalPref-Drmh7DQx.js",
    "revision": null
  }, {
    "url": "static/torrsLink-Dv5wuOWf.js",
    "revision": null
  }, {
    "url": "static/torrents-CbtuZqnK.js",
    "revision": null
  }, {
    "url": "static/torrentHelpers-CTD9DeTo.js",
    "revision": null
  }, {
    "url": "static/settingsEvents-BHp1EJvG.js",
    "revision": null
  }, {
    "url": "static/settings-jOyfh11j.js",
    "revision": null
  }, {
    "url": "static/runtime-B7ULw9YP.js",
    "revision": null
  }, {
    "url": "static/rolldown-runtime-8BhlS34s.js",
    "revision": null
  }, {
    "url": "static/maximize-2-CQXxI3L3.js",
    "revision": null
  }, {
    "url": "static/localPrefs-bn9onfF_.js",
    "revision": null
  }, {
    "url": "static/index-Dw9VwgYO.css",
    "revision": null
  }, {
    "url": "static/index-CjXk8Awe.js",
    "revision": null
  }, {
    "url": "static/hosts-DnQLd-FX.js",
    "revision": null
  }, {
    "url": "static/hls-CNyyJuiZ.js",
    "revision": null
  }, {
    "url": "static/heroui-cAUqM6vg.js",
    "revision": null
  }, {
    "url": "static/heart-BU9g4grQ.js",
    "revision": null
  }, {
    "url": "static/gauge-0irpaSiY.js",
    "revision": null
  }, {
    "url": "static/format-5IBR3633.js",
    "revision": null
  }, {
    "url": "static/film-YIHsYP9-.js",
    "revision": null
  }, {
    "url": "static/ellipsis-dKnQyVdX.js",
    "revision": null
  }, {
    "url": "static/createLucideIcon-Jw_TXnHh.js",
    "revision": null
  }, {
    "url": "static/clapperboard-DVhigDaH.js",
    "revision": null
  }, {
    "url": "static/circle-alert-ClTCLGj9.js",
    "revision": null
  }, {
    "url": "static/authCredentials-CpUpOGSq.js",
    "revision": null
  }, {
    "url": "static/VideoPlayer-BvDE6qHg.js",
    "revision": null
  }, {
    "url": "static/UnsafeButton-EFSguzZY.js",
    "revision": null
  }, {
    "url": "static/Toast-BcWDeYd9.js",
    "revision": null
  }, {
    "url": "static/SettingsDialog-Dk4nA5Fg.js",
    "revision": null
  }, {
    "url": "static/ServerStatusDialog-BWuYlC2N.js",
    "revision": null
  }, {
    "url": "static/SearchDialog-DX8PK2y1.js",
    "revision": null
  }, {
    "url": "static/RemoveAllDialog-Dvqe4KYU.js",
    "revision": null
  }, {
    "url": "static/PosterPicker-CUuDLTBT.js",
    "revision": null
  }, {
    "url": "static/PWAInstallationGuide-BYlcgfuU.js",
    "revision": null
  }, {
    "url": "static/MultiAddDialog-Ch21R6ta.js",
    "revision": null
  }, {
    "url": "static/ImportLibraryDialog-DUfJ8yQG.js",
    "revision": null
  }, {
    "url": "static/ExportLibraryDialog-DFyin1r1.js",
    "revision": null
  }, {
    "url": "static/EditTorrentDialog-DLA8-Jgt.js",
    "revision": null
  }, {
    "url": "static/DonateSnackbar-Bc7G7JdW.js",
    "revision": null
  }, {
    "url": "static/DonateDialog-CEZMVdgJ.js",
    "revision": null
  }, {
    "url": "static/DetailsDialog-DV-yBvJx.js",
    "revision": null
  }, {
    "url": "static/CommandPalette-B00N7-5G.js",
    "revision": null
  }, {
    "url": "static/CloseServerDialog-CnStFXdW.js",
    "revision": null
  }, {
    "url": "static/CategoriesDrawer-BgXJ3AvS.js",
    "revision": null
  }, {
    "url": "static/AppDialog-DbycvLCs.js",
    "revision": null
  }, {
    "url": "static/AndroidInstallBanner-B6eAYE0E.js",
    "revision": null
  }, {
    "url": "static/AddDialog-8i3rQIlc.js",
    "revision": null
  }, {
    "url": "static/AboutDialog-C45mrNmm.js",
    "revision": null
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/^\/stream/, /^\/torrent/, /^\/torrents/, /^\/cache/, /^\/settings/, /^\/echo/, /^\/gst/, /^\/ffp/, /^\/download/, /^\/viewed/, /^\/search/, /^\/tmdb/, /^\/torznab/, /^\/storage/, /^\/shutdown/, /^\/playlistall/, /^\/swagger/, /^\/stat/, /^\/magnets/]
  }));

}));
