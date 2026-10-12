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
    "revision": "0b79d275cfaba2827e365714bf8dee1b"
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
    "url": "static/vendor-Dy7IQDr1.js",
    "revision": null
  }, {
    "url": "static/useTranslation-D7c2ATyD.js",
    "revision": null
  }, {
    "url": "static/useTorrentDetail-_bnhdqat.js",
    "revision": null
  }, {
    "url": "static/torrsLink-Dv5wuOWf.js",
    "revision": null
  }, {
    "url": "static/torrents-DYiZMUau.js",
    "revision": null
  }, {
    "url": "static/torrentHelpers-ds1RsrD0.js",
    "revision": null
  }, {
    "url": "static/states-C1wEik_A.js",
    "revision": null
  }, {
    "url": "static/settings-D6i30M-C.js",
    "revision": null
  }, {
    "url": "static/runtime-j1i8JdK2.js",
    "revision": null
  }, {
    "url": "static/rolldown-runtime-8BhlS34s.js",
    "revision": null
  }, {
    "url": "static/maximize-2-jc_lEpTl.js",
    "revision": null
  }, {
    "url": "static/localPrefs-C6BvauQz.js",
    "revision": null
  }, {
    "url": "static/index-D65UzBaC.js",
    "revision": null
  }, {
    "url": "static/index-BMFHA28-.css",
    "revision": null
  }, {
    "url": "static/hosts-CMo7Owjk.js",
    "revision": null
  }, {
    "url": "static/hls-DbOvCaf2.js",
    "revision": null
  }, {
    "url": "static/heroui-C7OCMOHJ.js",
    "revision": null
  }, {
    "url": "static/heart-CjDIWPOT.js",
    "revision": null
  }, {
    "url": "static/gauge-Dp8XBjam.js",
    "revision": null
  }, {
    "url": "static/film-KYFDwzab.js",
    "revision": null
  }, {
    "url": "static/ellipsis-DgEzDQch.js",
    "revision": null
  }, {
    "url": "static/createLucideIcon-BrMNLKI3.js",
    "revision": null
  }, {
    "url": "static/clapperboard-U_ebDzty.js",
    "revision": null
  }, {
    "url": "static/circle-alert-nmvatb6Z.js",
    "revision": null
  }, {
    "url": "static/authCredentials-BZhgIdwZ.js",
    "revision": null
  }, {
    "url": "static/VideoPlayer-CY6njhhK.js",
    "revision": null
  }, {
    "url": "static/UnsafeButton-BjxbvFE8.js",
    "revision": null
  }, {
    "url": "static/SettingsDialog-BbwRmaVA.js",
    "revision": null
  }, {
    "url": "static/ServerStatusDialog-D_29jkj4.js",
    "revision": null
  }, {
    "url": "static/SearchDialog-CkLQeLPT.js",
    "revision": null
  }, {
    "url": "static/RemoveAllDialog-B9V9FV1c.js",
    "revision": null
  }, {
    "url": "static/PosterPicker-D-h5JUsm.js",
    "revision": null
  }, {
    "url": "static/PWAInstallationGuide-3tFvcGSz.js",
    "revision": null
  }, {
    "url": "static/MultiAddDialog-ZGtQXwXY.js",
    "revision": null
  }, {
    "url": "static/ModalOpenContext-CXMCD-lH.js",
    "revision": null
  }, {
    "url": "static/ImportLibraryDialog-C2DmA8SA.js",
    "revision": null
  }, {
    "url": "static/ExportLibraryDialog-BIQx0f8I.js",
    "revision": null
  }, {
    "url": "static/EditTorrentDialog-BxKwS2Ng.js",
    "revision": null
  }, {
    "url": "static/DonateSnackbar-k74jGTJc.js",
    "revision": null
  }, {
    "url": "static/DonateDialog-DPgNpEKv.js",
    "revision": null
  }, {
    "url": "static/DetailsDialog-wsFi3Okb.js",
    "revision": null
  }, {
    "url": "static/CommandPalette-5qd-e_Qw.js",
    "revision": null
  }, {
    "url": "static/CloseServerDialog-Ce7iC3Uq.js",
    "revision": null
  }, {
    "url": "static/CategoriesDrawer-Cu1ZC0-0.js",
    "revision": null
  }, {
    "url": "static/AppDialog-BYy_uxYO.js",
    "revision": null
  }, {
    "url": "static/AndroidInstallBanner-Bryr4mfW.js",
    "revision": null
  }, {
    "url": "static/AddDialog-ScqujS7D.js",
    "revision": null
  }, {
    "url": "static/AboutDialog-CYNRIb5S.js",
    "revision": null
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/^\/stream/, /^\/torrent/, /^\/torrents/, /^\/cache/, /^\/settings/, /^\/echo/, /^\/gst/, /^\/ffp/, /^\/download/, /^\/viewed/, /^\/search/, /^\/tmdb/, /^\/torznab/, /^\/storage/, /^\/waf/, /^\/mcp/, /^\/shutdown/, /^\/playlistall/, /^\/swagger/, /^\/stat/, /^\/magnets/]
  }));

}));
