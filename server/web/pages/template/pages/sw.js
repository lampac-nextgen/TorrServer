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
    "revision": "e5241c289f33fb53bd31bcad19c292e5"
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
    "url": "static/vendor-Bh6mcoZx.js",
    "revision": null
  }, {
    "url": "static/useTranslation-CHO5yPzz.js",
    "revision": null
  }, {
    "url": "static/useTorrentDetail-BPfidok-.js",
    "revision": null
  }, {
    "url": "static/useLocalPref-BdyVN_Jk.js",
    "revision": null
  }, {
    "url": "static/useDialogFullScreen-CK6Ze7fg.js",
    "revision": null
  }, {
    "url": "static/torrsLink-CrcAIGZk.js",
    "revision": null
  }, {
    "url": "static/torrents-BhaJRK4z.js",
    "revision": null
  }, {
    "url": "static/torrentHelpers-5R-ZaIjK.js",
    "revision": null
  }, {
    "url": "static/states-C1wEik_A.js",
    "revision": null
  }, {
    "url": "static/settings-DrGI2L6K.js",
    "revision": null
  }, {
    "url": "static/runtime-Cr253ZX3.js",
    "revision": null
  }, {
    "url": "static/rolldown-runtime-CNOWq4Kh.js",
    "revision": null
  }, {
    "url": "static/pollInterval-DDhtkZBE.js",
    "revision": null
  }, {
    "url": "static/maximize-2-Dc_CUoCi.js",
    "revision": null
  }, {
    "url": "static/localPrefs-C6BvauQz.js",
    "revision": null
  }, {
    "url": "static/index-qg96NOHE.css",
    "revision": null
  }, {
    "url": "static/index-D1dnwQz1.js",
    "revision": null
  }, {
    "url": "static/hosts-CEyv4OUe.js",
    "revision": null
  }, {
    "url": "static/hls-Bw3thQNh.js",
    "revision": null
  }, {
    "url": "static/heroui-DxLYSTdm.js",
    "revision": null
  }, {
    "url": "static/heart-Cl4DHqvQ.js",
    "revision": null
  }, {
    "url": "static/gauge-95V9F4s4.js",
    "revision": null
  }, {
    "url": "static/film-DTHpebcc.js",
    "revision": null
  }, {
    "url": "static/createLucideIcon-DHLRA3xa.js",
    "revision": null
  }, {
    "url": "static/clapperboard-esf6jLsY.js",
    "revision": null
  }, {
    "url": "static/circle-alert-D8SLpDY9.js",
    "revision": null
  }, {
    "url": "static/authCredentials-CGFatuGp.js",
    "revision": null
  }, {
    "url": "static/VideoPlayer-oi40U3uI.js",
    "revision": null
  }, {
    "url": "static/UnsafeButton-C7Aat_xt.js",
    "revision": null
  }, {
    "url": "static/SettingsDialog-J_dOElWa.js",
    "revision": null
  }, {
    "url": "static/ServerStatusDialog-zL1psx-E.js",
    "revision": null
  }, {
    "url": "static/SearchDialog-Bcd0tqxu.js",
    "revision": null
  }, {
    "url": "static/RemoveAllDialog-BZTnC1xJ.js",
    "revision": null
  }, {
    "url": "static/PosterPicker-BzsFeiXT.js",
    "revision": null
  }, {
    "url": "static/PWAInstallationGuide-DZwOAsYV.js",
    "revision": null
  }, {
    "url": "static/MultiAddDialog-C-dYSMqn.js",
    "revision": null
  }, {
    "url": "static/ModalOpenContext-Px9vUVWH.js",
    "revision": null
  }, {
    "url": "static/ImportLibraryDialog-Bkg_TSkJ.js",
    "revision": null
  }, {
    "url": "static/ExportLibraryDialog-X9digBmV.js",
    "revision": null
  }, {
    "url": "static/EditTorrentDialog-BwWzRXQm.js",
    "revision": null
  }, {
    "url": "static/DonateSnackbar-DbMX_c_y.js",
    "revision": null
  }, {
    "url": "static/DonateDialog-DUgd0VMy.js",
    "revision": null
  }, {
    "url": "static/DetailsDialog-QGQ7PA25.js",
    "revision": null
  }, {
    "url": "static/CommandPalette-CG7d12Et.js",
    "revision": null
  }, {
    "url": "static/CloseServerDialog-BejA9mBW.js",
    "revision": null
  }, {
    "url": "static/CategoriesDrawer-CqWHfj46.js",
    "revision": null
  }, {
    "url": "static/AppDialog-DdrtxPCt.js",
    "revision": null
  }, {
    "url": "static/AndroidInstallBanner-CSW5zCuA.js",
    "revision": null
  }, {
    "url": "static/AddDialog-CSMG4dF2.js",
    "revision": null
  }, {
    "url": "static/AboutDialog-DBXtXZom.js",
    "revision": null
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/^\/stream/, /^\/play/, /^\/subs/, /^\/playlist/, /^\/msx/, /^\/files/, /^\/torrent/, /^\/torrents/, /^\/cache/, /^\/settings/, /^\/echo/, /^\/gst/, /^\/ffp/, /^\/download/, /^\/viewed/, /^\/search/, /^\/tmdb/, /^\/torznab/, /^\/storage/, /^\/waf/, /^\/mcp/, /^\/shutdown/, /^\/playlistall/, /^\/swagger/, /^\/stat/, /^\/magnets/, /^\/runtime/, /^\/debug/, /^\/ssl/, /^\/mediabase/]
  }));

}));
