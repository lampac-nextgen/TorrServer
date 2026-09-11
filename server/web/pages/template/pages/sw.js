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
    "revision": "bcf2a1afc3e33b2042f438257685e059"
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
    "url": "static/vendor-Dr0iRWjn.js",
    "revision": null
  }, {
    "url": "static/useTranslation-Dv-7x-KA.js",
    "revision": null
  }, {
    "url": "static/useTorrentDetail-DKvYnzdq.js",
    "revision": null
  }, {
    "url": "static/torrsLink-Dv5wuOWf.js",
    "revision": null
  }, {
    "url": "static/torrents-CXiJ6RRR.js",
    "revision": null
  }, {
    "url": "static/torrentHelpers-DeZhkhtS.js",
    "revision": null
  }, {
    "url": "static/runtime-yKRHTqNN.js",
    "revision": null
  }, {
    "url": "static/rolldown-runtime-8BhlS34s.js",
    "revision": null
  }, {
    "url": "static/maximize-2-DzBjOwSc.js",
    "revision": null
  }, {
    "url": "static/localPrefs-bn9onfF_.js",
    "revision": null
  }, {
    "url": "static/index-DcHk3T4g.css",
    "revision": null
  }, {
    "url": "static/index-CjE0DzTL.js",
    "revision": null
  }, {
    "url": "static/hosts-CdUK6JJa.js",
    "revision": null
  }, {
    "url": "static/hls-wbcGJAlg.js",
    "revision": null
  }, {
    "url": "static/heroui---c5O7us.js",
    "revision": null
  }, {
    "url": "static/heart-BX2fcPYA.js",
    "revision": null
  }, {
    "url": "static/gauge-c0z5VQVg.js",
    "revision": null
  }, {
    "url": "static/film-DMiuX68z.js",
    "revision": null
  }, {
    "url": "static/ellipsis-DrxZdOCf.js",
    "revision": null
  }, {
    "url": "static/createLucideIcon-AVcKEoxp.js",
    "revision": null
  }, {
    "url": "static/clapperboard-D8Yi8FOr.js",
    "revision": null
  }, {
    "url": "static/circle-alert-BVAvaQDO.js",
    "revision": null
  }, {
    "url": "static/authCredentials-Cg8_kgu1.js",
    "revision": null
  }, {
    "url": "static/VideoPlayer-CnenaawF.js",
    "revision": null
  }, {
    "url": "static/UnsafeButton-BR3bkfzR.js",
    "revision": null
  }, {
    "url": "static/SettingsDialog-BlUttYtz.js",
    "revision": null
  }, {
    "url": "static/ServerStatusDialog-Bz2mXS8J.js",
    "revision": null
  }, {
    "url": "static/SearchDialog-Z_Pr1AtS.js",
    "revision": null
  }, {
    "url": "static/RemoveAllDialog-BtxqYNC6.js",
    "revision": null
  }, {
    "url": "static/PosterPicker-BjR9hkxy.js",
    "revision": null
  }, {
    "url": "static/PWAInstallationGuide-CX4OpLbW.js",
    "revision": null
  }, {
    "url": "static/MultiAddDialog-DthSZ4sV.js",
    "revision": null
  }, {
    "url": "static/ModalOpenContext-CYCfLy4U.js",
    "revision": null
  }, {
    "url": "static/ImportLibraryDialog-8QvgNi5u.js",
    "revision": null
  }, {
    "url": "static/ExportLibraryDialog-CJH63yqM.js",
    "revision": null
  }, {
    "url": "static/EditTorrentDialog-DTu--h40.js",
    "revision": null
  }, {
    "url": "static/DonateSnackbar-UdDiaHFy.js",
    "revision": null
  }, {
    "url": "static/DonateDialog-A5UW1xMr.js",
    "revision": null
  }, {
    "url": "static/DetailsDialog-JDjLzapd.js",
    "revision": null
  }, {
    "url": "static/CommandPalette-CCmgeLvN.js",
    "revision": null
  }, {
    "url": "static/CloseServerDialog-BEQX6RUd.js",
    "revision": null
  }, {
    "url": "static/CategoriesDrawer-6iKYoBvR.js",
    "revision": null
  }, {
    "url": "static/AppDialog-DV9LvG96.js",
    "revision": null
  }, {
    "url": "static/AndroidInstallBanner-BQwl-RXB.js",
    "revision": null
  }, {
    "url": "static/AddDialog-Bz4D7SuJ.js",
    "revision": null
  }, {
    "url": "static/AboutDialog-ZwdceA4P.js",
    "revision": null
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/^\/stream/, /^\/torrent/, /^\/torrents/, /^\/cache/, /^\/settings/, /^\/echo/, /^\/gst/, /^\/ffp/, /^\/download/, /^\/viewed/, /^\/search/, /^\/tmdb/, /^\/torznab/, /^\/storage/, /^\/waf/, /^\/mcp/, /^\/shutdown/, /^\/playlistall/, /^\/swagger/, /^\/stat/, /^\/magnets/]
  }));

}));
