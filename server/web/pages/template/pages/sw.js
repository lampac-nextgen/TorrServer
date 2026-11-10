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
    "revision": "59d3ee1884e61d4bedba3faf56e26d5a"
  }, {
    "url": "icon.png",
    "revision": "4a7a2fa5a2a3c9bbfde8e92aaeab2cf4"
  }, {
    "url": "icon-maskable-512.png",
    "revision": "fdd3a81491b22083234648e24ff574e9"
  }, {
    "url": "icon-maskable-192.png",
    "revision": "02f6ab7b0f4ee2d1370768a21aef8e32"
  }, {
    "url": "icon-192.png",
    "revision": "e6640dac24bf6a2f32fc08399b7e08be"
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
    "url": "apple-touch-icon.png",
    "revision": "ec59449613d2bce565a082c132a6cb03"
  }, {
    "url": "static/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "static/vendor-C_LJwty1.js",
    "revision": null
  }, {
    "url": "static/useTranslation-wov4ecYy.js",
    "revision": null
  }, {
    "url": "static/useTorrentDetail-Blt6NQGJ.js",
    "revision": null
  }, {
    "url": "static/useThemePreference-Caox3o1n.js",
    "revision": null
  }, {
    "url": "static/useLocalPref-BQ0oYhwl.js",
    "revision": null
  }, {
    "url": "static/useDialogFullScreen-BlZbPcTw.js",
    "revision": null
  }, {
    "url": "static/torrsLink-CrcAIGZk.js",
    "revision": null
  }, {
    "url": "static/torrents-Lxc4hTE5.js",
    "revision": null
  }, {
    "url": "static/torrentHelpers-SGnlAvR6.js",
    "revision": null
  }, {
    "url": "static/states-C1wEik_A.js",
    "revision": null
  }, {
    "url": "static/settings-CjQH4Pfl.js",
    "revision": null
  }, {
    "url": "static/runtime-DiN1fxb8.js",
    "revision": null
  }, {
    "url": "static/rolldown-runtime-CNOWq4Kh.js",
    "revision": null
  }, {
    "url": "static/publicUrl-C53js1nF.js",
    "revision": null
  }, {
    "url": "static/pollInterval-DDhtkZBE.js",
    "revision": null
  }, {
    "url": "static/parse-torrent-title-Dg2_fbqy.js",
    "revision": null
  }, {
    "url": "static/maximize-2-BCpVeJsv.js",
    "revision": null
  }, {
    "url": "static/localPrefs-C6BvauQz.js",
    "revision": null
  }, {
    "url": "static/index-qSzjHNqy.css",
    "revision": null
  }, {
    "url": "static/index-Co0lr9m1.js",
    "revision": null
  }, {
    "url": "static/hosts-CEyv4OUe.js",
    "revision": null
  }, {
    "url": "static/hls-CJWfdge_.js",
    "revision": null
  }, {
    "url": "static/heroui-DaPxwdho.js",
    "revision": null
  }, {
    "url": "static/heart-CcAqvsec.js",
    "revision": null
  }, {
    "url": "static/gauge-D8OlkCih.js",
    "revision": null
  }, {
    "url": "static/film-Bjebx4xv.js",
    "revision": null
  }, {
    "url": "static/createLucideIcon-D3VbPVb0.js",
    "revision": null
  }, {
    "url": "static/clapperboard-DbY0iH2o.js",
    "revision": null
  }, {
    "url": "static/circle-exclamation-point-BfqrulAr.js",
    "revision": null
  }, {
    "url": "static/authCredentials-_EFuLXMQ.js",
    "revision": null
  }, {
    "url": "static/VideoPlayer-DXJEznZI.js",
    "revision": null
  }, {
    "url": "static/UnsafeButton-DTBW-cKU.js",
    "revision": null
  }, {
    "url": "static/SettingsDialog-BGyNFWY7.js",
    "revision": null
  }, {
    "url": "static/ServerStatusDialog-BRVKGynB.js",
    "revision": null
  }, {
    "url": "static/SearchDialog-D_Q1UDTL.js",
    "revision": null
  }, {
    "url": "static/RemoveAllDialog-ByRjihwU.js",
    "revision": null
  }, {
    "url": "static/PosterPicker-B190hm8X.js",
    "revision": null
  }, {
    "url": "static/PWAInstallationGuide-F3EauxUv.js",
    "revision": null
  }, {
    "url": "static/MultiAddDialog-DdX_5pEN.js",
    "revision": null
  }, {
    "url": "static/ModalOpenContext-DC04PWCE.js",
    "revision": null
  }, {
    "url": "static/ImportLibraryDialog-CbkToVmf.js",
    "revision": null
  }, {
    "url": "static/ExportLibraryDialog-DetIla9c.js",
    "revision": null
  }, {
    "url": "static/EditTorrentDialog-DQe4lV_X.js",
    "revision": null
  }, {
    "url": "static/DonateSnackbar-DZyp5jNv.js",
    "revision": null
  }, {
    "url": "static/DonateDialog-kQ0RCFol.js",
    "revision": null
  }, {
    "url": "static/DetailsDialog-B8z19OcW.js",
    "revision": null
  }, {
    "url": "static/CommandPalette-p7Nm7c4a.js",
    "revision": null
  }, {
    "url": "static/CloseServerDialog-Bknv-BQW.js",
    "revision": null
  }, {
    "url": "static/CategoriesDrawer-Bk7h_j5T.js",
    "revision": null
  }, {
    "url": "static/AppDialog-ux7vX7Ai.js",
    "revision": null
  }, {
    "url": "static/AndroidInstallBanner-DA7j400x.js",
    "revision": null
  }, {
    "url": "static/AddDialog-BEHMftIt.js",
    "revision": null
  }, {
    "url": "static/AboutDialog-DpnqW_DQ.js",
    "revision": null
  }, {
    "url": "brand/logo-light.svg",
    "revision": "3068c426fb75cf07431346ab4999e2bd"
  }, {
    "url": "brand/logo-dark.svg",
    "revision": "3f8b951bf0848f5774989d6f686e02ce"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/^\/stream/, /^\/play/, /^\/subs/, /^\/playlist/, /^\/msx/, /^\/files/, /^\/torrent/, /^\/torrents/, /^\/cache/, /^\/settings/, /^\/echo/, /^\/gst/, /^\/ffp/, /^\/download/, /^\/viewed/, /^\/search/, /^\/tmdb/, /^\/torznab/, /^\/storage/, /^\/waf/, /^\/mcp/, /^\/shutdown/, /^\/playlistall/, /^\/swagger/, /^\/stat/, /^\/magnets/, /^\/runtime/, /^\/debug/, /^\/ssl/, /^\/mediabase/]
  }));

}));
