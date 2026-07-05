/* coi-serviceworker.js — OPCIONAL
   Coloque este arquivo na mesma pasta do index.html para habilitar a conversão
   multi-núcleo (bem mais rápida) em hospedagens que não permitem configurar
   cabeçalhos HTTP (ex.: GitHub Pages). Ele adiciona os cabeçalhos
   Cross-Origin-Opener-Policy / Cross-Origin-Embedder-Policy às respostas,
   o que libera o SharedArrayBuffer exigido pelo ffmpeg.wasm multithread.
   Sem este arquivo, o site funciona normalmente em modo de núcleo único. */

self.addEventListener('install', function () { self.skipWaiting(); });

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') return;

  event.respondWith(
    fetch(request).then(function (response) {
      if (response.status === 0) return response;
      var headers = new Headers(response.headers);
      headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
      headers.set('Cross-Origin-Opener-Policy', 'same-origin');
      headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers,
      });
    })
  );
});
