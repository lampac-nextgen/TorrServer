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
    "revision": "e70d4914c82dfa1268a5449c3496c857"
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
    "url": "static/vendor-Dr5qjIYf.js",
    "revision": null
  }, {
    "url": "static/useTranslation-Dr5TEQQl.js",
    "revision": null
  }, {
    "url": "static/useTorrentDetail-CD0cUyzJ.js",
    "revision": null
  }, {
    "url": "static/useThemePreference-tn3pNyGa.js",
    "revision": null
  }, {
    "url": "static/useLocalPref-yl7L2X59.js",
    "revision": null
  }, {
    "url": "static/useDialogFullScreen-Dh0VVFEd.js",
    "revision": null
  }, {
    "url": "static/torrsLink-CrcAIGZk.js",
    "revision": null
  }, {
    "url": "static/torrents-CQ2JN4r2.js",
    "revision": null
  }, {
    "url": "static/torrentHelpers-Car3ke3B.js",
    "revision": null
  }, {
    "url": "static/states-C1wEik_A.js",
    "revision": null
  }, {
    "url": "static/settings-CByM-wMf.js",
    "revision": null
  }, {
    "url": "static/runtime-ePyYQLfT.js",
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
    "url": "static/maximize-2-BtR9_LSJ.js",
    "revision": null
  }, {
    "url": "static/localPrefs-C6BvauQz.js",
    "revision": null
  }, {
    "url": "static/index-q15gmADX.js",
    "revision": null
  }, {
    "url": "static/index-FMTKMZGF.css",
    "revision": null
  }, {
    "url": "static/hosts-CEyv4OUe.js",
    "revision": null
  }, {
    "url": "static/hls-CJWfdge_.js",
    "revision": null
  }, {
    "url": "static/heroui-CcMZDSdM.js",
    "revision": null
  }, {
    "url": "static/heart-wstld3zt.js",
    "revision": null
  }, {
    "url": "static/gauge-BrPUDKl8.js",
    "revision": null
  }, {
    "url": "static/film-DYhp5iIX.js",
    "revision": null
  }, {
    "url": "static/createLucideIcon-nX1vUKVM.js",
    "revision": null
  }, {
    "url": "static/clapperboard-BueXTHeM.js",
    "revision": null
  }, {
    "url": "static/circle-exclamation-point-DqcyTrSD.js",
    "revision": null
  }, {
    "url": "static/authCredentials-3umL0gLp.js",
    "revision": null
  }, {
    "url": "static/VideoPlayer-DSc3IECp.js",
    "revision": null
  }, {
    "url": "static/UnsafeButton-DI4rg4cK.js",
    "revision": null
  }, {
    "url": "static/SettingsDialog-CXDeKdIt.js",
    "revision": null
  }, {
    "url": "static/ServerStatusDialog-C1rvhbuY.js",
    "revision": null
  }, {
    "url": "static/SearchDialog-6Z0716_L.js",
    "revision": null
  }, {
    "url": "static/RemoveAllDialog-CtneiY1I.js",
    "revision": null
  }, {
    "url": "static/PosterPicker-Cd_Sdy-J.js",
    "revision": null
  }, {
    "url": "static/PWAInstallationGuide--fhkmroz.js",
    "revision": null
  }, {
    "url": "static/MultiAddDialog-BQRCl3I4.js",
    "revision": null
  }, {
    "url": "static/ModalOpenContext-C_Zirt8k.js",
    "revision": null
  }, {
    "url": "static/ImportLibraryDialog-B8kGQ4Jl.js",
    "revision": null
  }, {
    "url": "static/ExportLibraryDialog-yDixCdyR.js",
    "revision": null
  }, {
    "url": "static/EditTorrentDialog-_6XhR4KY.js",
    "revision": null
  }, {
    "url": "static/DonateSnackbar-HDAsaU1c.js",
    "revision": null
  }, {
    "url": "static/DonateDialog-BIa95Afp.js",
    "revision": null
  }, {
    "url": "static/DetailsDialog-BVtG8f0j.js",
    "revision": null
  }, {
    "url": "static/CommandPalette-ChtXqDfB.js",
    "revision": null
  }, {
    "url": "static/CloseServerDialog-Bf49Zpmj.js",
    "revision": null
  }, {
    "url": "static/CategoriesDrawer-DyjeYa4a.js",
    "revision": null
  }, {
    "url": "static/AppDialog-W-PVsYPR.js",
    "revision": null
  }, {
    "url": "static/AndroidInstallBanner-C6xXqr3Q.js",
    "revision": null
  }, {
    "url": "static/AddDialog-DDCPmr2O.js",
    "revision": null
  }, {
    "url": "static/AboutDialog-Do7PetMg.js",
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
