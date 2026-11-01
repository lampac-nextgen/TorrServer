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
    "revision": "8b1e380c324cbb396762a0d48a4c58f5"
  }, {
    "url": "logo.png",
    "revision": "309432780e6787fb85db09f65df99d3a"
  }, {
    "url": "index.html",
    "revision": "5336a532a97afdc62f4135cd821e5419"
  }, {
    "url": "icon.png",
    "revision": "4a7a2fa5a2a3c9bbfde8e92aaeab2cf4"
  }, {
    "url": "favicon.ico",
    "revision": "55a7d8b2cf89818a9badaf8c2c9a1ce2"
  }, {
    "url": "favicon-32x32.png",
    "revision": "8a4fc6ed45884443cd47ab7f3b0b83e6"
  }, {
    "url": "favicon-16x16.png",
    "revision": "bf58b52542cfe6e641d684189918bc48"
  }, {
    "url": "dlnaicon-48.png",
    "revision": "c9b5afe8c9408fa46deebec9ca6d2f81"
  }, {
    "url": "dlnaicon-120.png",
    "revision": "75b551cbe2025437ddce98463bc9f293"
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
    "url": "static/useTorrentDetail-jq8tfOdc.js",
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
    "url": "static/torrentHelpers-DmZOjQUj.js",
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
    "url": "static/index-W6fvGdJ5.css",
    "revision": null
  }, {
    "url": "static/index-DxkULpWD.js",
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
    "url": "static/VideoPlayer-DQ8slymu.js",
    "revision": null
  }, {
    "url": "static/UnsafeButton-C7Aat_xt.js",
    "revision": null
  }, {
    "url": "static/SettingsDialog-NjYPYAcP.js",
    "revision": null
  }, {
    "url": "static/ServerStatusDialog-KhP0b4k6.js",
    "revision": null
  }, {
    "url": "static/SearchDialog-DbOAhy2a.js",
    "revision": null
  }, {
    "url": "static/RemoveAllDialog-BhEsbNco.js",
    "revision": null
  }, {
    "url": "static/PosterPicker-Bn2YKRSL.js",
    "revision": null
  }, {
    "url": "static/PWAInstallationGuide-Cy1HGMvm.js",
    "revision": null
  }, {
    "url": "static/MultiAddDialog-3uFwvQBO.js",
    "revision": null
  }, {
    "url": "static/ModalOpenContext-Px9vUVWH.js",
    "revision": null
  }, {
    "url": "static/ImportLibraryDialog-C-zhBwHZ.js",
    "revision": null
  }, {
    "url": "static/ExportLibraryDialog-CbE3ZGv8.js",
    "revision": null
  }, {
    "url": "static/EditTorrentDialog-CysFuNF-.js",
    "revision": null
  }, {
    "url": "static/DonateSnackbar-CqXgS6p7.js",
    "revision": null
  }, {
    "url": "static/DonateDialog-Q1D804pA.js",
    "revision": null
  }, {
    "url": "static/DetailsDialog-BPBgZt7j.js",
    "revision": null
  }, {
    "url": "static/CommandPalette-HFutZshZ.js",
    "revision": null
  }, {
    "url": "static/CloseServerDialog-BcE8hRKP.js",
    "revision": null
  }, {
    "url": "static/CategoriesDrawer-DLop0Uif.js",
    "revision": null
  }, {
    "url": "static/AppDialog-DdrtxPCt.js",
    "revision": null
  }, {
    "url": "static/AndroidInstallBanner-BQVSShaf.js",
    "revision": null
  }, {
    "url": "static/AddDialog-C2wbtmJ0.js",
    "revision": null
  }, {
    "url": "static/AboutDialog-CR_bJrzm.js",
    "revision": null
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/^\/stream/, /^\/play/, /^\/subs/, /^\/playlist/, /^\/msx/, /^\/files/, /^\/torrent/, /^\/torrents/, /^\/cache/, /^\/settings/, /^\/echo/, /^\/gst/, /^\/ffp/, /^\/download/, /^\/viewed/, /^\/search/, /^\/tmdb/, /^\/torznab/, /^\/storage/, /^\/waf/, /^\/mcp/, /^\/shutdown/, /^\/playlistall/, /^\/swagger/, /^\/stat/, /^\/magnets/, /^\/runtime/, /^\/debug/, /^\/ssl/, /^\/mediabase/]
  }));

}));
