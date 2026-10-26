(() => {
  'use strict';
  const scenes = [
    { image: '1.png', location: 'SINIF', value: 'Dinlemek', title: 'Bir arkadaşını\ndinlemek.', description: 'Umut yaşadığı üzüntüyü anlatır. Nida onu dinler ve birlikte destek istemeyi önerir.', quote: '“Yanındayım. Birlikte öğretmenimize anlatalım.”', time: 'SAHNE 01 / 04', alt: 'Sınıfta Nida, Umut’u dikkatle dinliyor.' },
    { image: '2.png', location: 'KANTİN', value: 'Saygı duymak', title: 'Herkesin sırasına\nsaygı duymak.', description: 'Umut, Can’ın beklediğini fark eder. Ona sırasını bırakıp arkasına geçer. Küçük bir hareket, karşımızdakine değer verdiğimizi gösterir.', quote: 'Bazen nezaket, bir adım geride durmaktır.', time: 'SAHNE 02 / 04', alt: 'Kantinde Nida, Derya ve Can sırada beklerken Umut yanlarında duruyor.' },
    { image: '3.png', location: 'KORİDOR', value: 'Yardım etmek', title: 'Bir yardım eli\nuzatmak.', description: 'Derya’nın defterleri yere düşer. Can ve Umut hemen yardıma yönelir. Nida onlara alan açar. Nezaket bir arkadaşından diğerine yayılır.', quote: 'Birlikteyken yükümüz hafifler.', time: 'SAHNE 03 / 04', alt: 'Koridorda Can ve Umut, Derya’nın elinden kayan defterleri fark ediyor.' },
    { image: '4.png', location: 'YENİDEN SINIFTA', value: 'Birlikte olmak', title: 'Aynı masada\nbuluşmak.', description: 'Umut, tek başına oturan Can’ı grup çalışmasına davet eder. Nida ve Derya ona yer açar. Hikâye, dört arkadaşın birlikte çalışmasıyla tamamlanır.', quote: '“Can, bizimle çalışmak ister misin?”', time: 'SAHNE 04 / 04', alt: 'Umut, Nida ve Derya’nın çalışma masasının yanında Can için boş bir sandalye var.' },
  ];
  const $ = id => document.getElementById(id);
  const slideshow = document.querySelector('.slideshow');
  const dots = [...document.querySelectorAll('[data-slide]')];
  let current = 0;
  let timer = null;
  function showSlide(index) {
    current = (index + scenes.length) % scenes.length;
    const scene = scenes[current];
    $('slide-image').src = `assets/images/${scene.image}`;
    $('slide-image').alt = scene.alt;
    $('slide-location').textContent = scene.location;
    $('slide-number').textContent = `0${current + 1} / 04`;
    $('slide-value').textContent = scene.value;
    $('slide-title').textContent = scene.title;
    $('slide-title').style.whiteSpace = 'pre-line';
    $('slide-description').textContent = scene.description;
    $('slide-quote').textContent = scene.quote;
    $('slide-time').textContent = scene.time;
    dots.forEach((dot, i) => i === current ? dot.setAttribute('aria-current', 'true') : dot.removeAttribute('aria-current'));
  }
  function stopAutoplay() {
    clearInterval(timer);
    timer = null;
    $('autoplay').textContent = '▷ Otomatik oynat';
    $('autoplay').setAttribute('aria-pressed', 'false');
    document.querySelector('.slide-content').setAttribute('aria-live', 'polite');
  }
  function navigate(index) { stopAutoplay(); showSlide(index); }
  $('previous-slide').addEventListener('click', () => navigate(current - 1));
  $('next-slide').addEventListener('click', () => navigate(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => navigate(Number(dot.dataset.slide))));
  slideshow.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); navigate(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  $('autoplay').addEventListener('click', () => {
    if (timer) return stopAutoplay();
    $('autoplay').textContent = 'Ⅱ Duraklat';
    $('autoplay').setAttribute('aria-pressed', 'true');
    document.querySelector('.slide-content').setAttribute('aria-live', 'off');
    timer = setInterval(() => showSlide(current + 1), 8000);
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopAutoplay(); });
  if (slideshow.requestFullscreen) {
    $('fullscreen').addEventListener('click', async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await slideshow.requestFullscreen();
      } catch { $('fullscreen').textContent = 'Tam ekran kullanılamıyor'; }
    });
    document.addEventListener('fullscreenchange', () => { $('fullscreen').textContent = document.fullscreenElement ? '⛶ Tam ekrandan çık' : '⛶ Tam ekran'; });
  } else $('fullscreen').hidden = true;

  let touchStart = null;
  slideshow.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
  slideshow.addEventListener('touchend', event => {
    if (touchStart === null) return;
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 60) navigate(current + (distance < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });

  // Accept only web URLs; never inject a URL into HTML markup.
  function parseVideo(raw) {
    let url;
    try { url = new URL(raw); } catch { return null; }
    if (!['https:', 'http:'].includes(url.protocol)) return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    if (host === 'drive.google.com') {
      const match = url.pathname.match(/^\/file\/d\/([\w-]+)(?:\/|$)/);
      const id = match?.[1] || url.searchParams.get('id');
      if (id && /^[\w-]+$/.test(id)) return { url: url.href, embed: `https://drive.google.com/file/d/${id}/preview` };
      return { url: url.href };
    }
    const isYoutube = ['youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'youtu.be'].includes(host);
    if (isYoutube) {
      const parts = url.pathname.split('/').filter(Boolean);
      const id = host === 'youtu.be' ? parts[0] : url.searchParams.get('v') || (['shorts', 'embed', 'live'].includes(parts[0]) ? parts[1] : '');
      if (/^[\w-]{11}$/.test(id || '')) return { url: url.href, embed: `https://www.youtube-nocookie.com/embed/${id}` };
      return { url: url.href };
    }
    if (['vimeo.com', 'player.vimeo.com'].includes(host)) {
      const parts = url.pathname.split('/').filter(Boolean);
      const id = host === 'player.vimeo.com' ? parts[1] : parts[0];
      if (/^\d+$/.test(id || '')) {
        const privacyHash = url.searchParams.get('h') || parts[1];
        const suffix = privacyHash && /^[\da-z]+$/i.test(privacyHash) ? `?h=${encodeURIComponent(privacyHash)}` : '';
        return { url: url.href, embed: `https://player.vimeo.com/video/${id}${suffix}` };
      }
    }
    return { url: url.href, direct: /\.(mp4|webm|ogg)$/i.test(url.pathname) };
  }
  const video = parseVideo(window.FILM_CONFIG?.videoUrl || '');
  if (video) {
    const watch = $('watch-film');
    watch.href = video.url;
    watch.hidden = false;
    $('film-pending').hidden = true;
    if (video.embed || video.direct) {
      const player = $('video-player');
      if (video.embed) {
        const frame = document.createElement('iframe');
        frame.src = video.embed;
        frame.title = 'Nezaket Bulaşır kısa filmi';
        frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
        frame.allowFullscreen = true;
        frame.loading = 'lazy';
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        player.append(frame);
      } else {
        const element = document.createElement('video');
        element.src = video.url; element.controls = true; element.playsInline = true;
        element.preload = 'none'; element.poster = 'assets/images/4.png';
        element.setAttribute('aria-label', 'Nezaket Bulaşır kısa filmi');
        element.append(document.createTextNode('Videoyu izlemek için yukarıdaki Filmi izle bağlantısını kullanabilirsiniz.'));
        player.append(element);
      }
      player.hidden = false;
      watch.href = '#video-player'; watch.removeAttribute('target');
      $('film-note').textContent = 'Oynatıcıdan izleyebilir veya bağlantıyı yeni sekmede açabilirsin.';
      const external = document.createElement('a');
      external.href = video.url; external.target = '_blank'; external.rel = 'noopener noreferrer';
      external.textContent = 'Videoyu yeni sekmede aç ↗'; external.className = 'external-video';
      $('film-note').append(document.createElement('br'), external);
    } else $('film-note').textContent = 'Film bağlantısı yeni sekmede açılır.';
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) document.querySelectorAll('.header nav a').forEach(link => {
          const selected = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active', selected);
          if (selected) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-10% 0px -60% 0px', threshold: 0 });
    document.querySelectorAll('#kahramanlar, #hikaye, #sahneler, #film').forEach(section => observer.observe(section));
  }
})();
