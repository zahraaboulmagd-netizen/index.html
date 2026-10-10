/*
  Portfolio app — renders views from content.js.
  Routes (hash-based so GitHub Pages needs no server config):
    #/              home + selected works
    #/work/<slug>   project page
    #/about  #/cv  #/contact
*/
(function () {
  'use strict';

  const S = window.SITE;
  const app = document.getElementById('app');
  const header = document.getElementById('siteHeader');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  /* ---------- helpers ---------- */

  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
  const pad = (n) => String(n).padStart(2, '0');
  const projectNum = (i) => String(i + 1).padStart(3, '0');
  const coverOf = (p) => p.cover || (p.images[0] && p.images[0].src) || '';
  const tapes = ['tl tr', 'tc', 'tl', 'tr', 'tc'];
  const tapeHtml = (i) => tapes[i % tapes.length].split(' ').map((t) => `<span class="tape ${t}"></span>`).join('');
  const tilt = (i) => [-1.4, 1.2, -0.6, 1.6, -1][i % 5] + 'deg';
  const disciplines = [...new Set(S.projects.map((p) => p.discipline))];

  function topline(left, right) {
    return `<div class="topline mono"><span>${left}</span><span>${right}</span></div>`;
  }

  /* ---------- views ---------- */

  function viewHome() {
    const cards = S.projects.map((p, i) => `
      <a class="work-card reveal" href="#/work/${esc(p.slug)}" data-discipline="${esc(p.discipline)}">
        <div class="frame" style="--tilt:${tilt(i)}">
          ${tapeHtml(i)}
          <div class="frame-img"><img src="${esc(coverOf(p))}" alt="${esc(p.title)}" loading="${i < 2 ? 'eager' : 'lazy'}"></div>
        </div>
        <div class="work-info">
          <span class="mono work-num">${projectNum(i)}</span>
          <h3 class="work-title">${esc(p.title)}</h3>
          <span class="work-arrow" aria-hidden="true">↗</span>
          <span class="mono work-sub">${esc(p.discipline)}${p.year ? ' — ' + esc(p.year) : ''}</span>
          ${p.summary ? `<p class="work-summary">${esc(p.summary)}</p>` : ''}
        </div>
      </a>`).join('');

    const filters = disciplines.length > 1 ? `
      <div class="filters" role="group" aria-label="Filter projects">
        <button class="filter" aria-pressed="true" data-filter="*">All</button>
        ${disciplines.map((d) => `<button class="filter" aria-pressed="false" data-filter="${esc(d)}">${esc(d)}</button>`).join('')}
      </div>` : '';

    return `
      <section class="wrap hero">
        ${topline('Portfolio / Selected Works', esc(S.location) + ' — NY')}
        <h1 class="hero-title" aria-label="${esc(S.name)}">
          <span class="line"><span>${esc(S.firstName)}</span></span>
          <span class="line"><span>${esc(S.lastName)}<span class="asterisk" aria-hidden="true">✳</span></span></span>
        </h1>
        <div class="hero-foot">
          <div>
            <p class="hand hero-note">design, objects, spaces &amp; everything in between ↘</p>
            <p class="hero-intro">${esc(S.intro)}</p>
            <a class="mono scroll-cue" href="#works" data-scroll="works">Selected works</a>
          </div>
          <dl class="hero-meta mono">
            <div><dt>Practice</dt><dd>${esc(S.role)}</dd></div>
            <div><dt>Disciplines</dt><dd>${disciplines.map(esc).join(' / ')}</dd></div>
            <div><dt>Education</dt><dd>${esc(S.school)}</dd></div>
            <div><dt>Based in</dt><dd>${esc(S.location)}</dd></div>
          </dl>
        </div>
      </section>

      <section class="wrap works" id="works" aria-labelledby="worksTitle">
        <div class="section-head">
          <h2 class="section-title" id="worksTitle">Selected Works<sup>(${pad(S.projects.length)})</sup></h2>
          ${filters}
        </div>
        <div class="work-grid">${cards}</div>
      </section>

      ${S.quote ? `
      <section class="wrap quote-band reveal">
        <span class="mono">A thought to design by</span>
        <blockquote>${esc(S.quote.text)}</blockquote>
        <div class="hand quote-author">— ${esc(S.quote.author)}</div>
      </section>` : ''}

      <div class="wrap">
        <a class="cta reveal" href="#/contact">
          <span class="mono">Say hello</span>
          <p class="cta-title">Let’s make something <em>different</em> <span class="arrow">↗</span></p>
        </a>
      </div>`;
  }

  function viewProject(slug) {
    const i = S.projects.findIndex((p) => p.slug === slug);
    if (i < 0) return viewNotFound();
    const p = S.projects[i];
    const next = S.projects[(i + 1) % S.projects.length];
    const [first, ...rest] = p.images;
    const coverIsFirst = !p.cover && first;
    const galleryImgs = coverIsFirst ? rest : p.images;
    const gOffset = coverIsFirst ? 1 : 0;

    const meta = [
      ['Discipline', p.discipline],
      ['Year', p.year],
      ['Type', p.type],
      ['Themes', (p.tags || []).join(', ')]
    ].filter(([, v]) => v);

    const gallery = galleryImgs.map((img, k) => `
      <figure class="reveal ${img.wide ? 'wide' : ''}">
        <button class="gallery-btn" data-lb-index="${k + gOffset}" aria-label="View larger: ${esc(img.caption || p.title)}">
          <div class="frame" style="--tilt:${k % 2 ? '0.5deg' : '-0.5deg'}">
            <div class="frame-img"><img src="${esc(img.src)}" alt="${esc(img.alt || img.caption || p.title)}" loading="lazy"></div>
          </div>
        </button>
        ${img.caption ? `<figcaption><span class="mono">Fig. ${pad(k + 1 + gOffset)}</span><span>${esc(img.caption)}</span></figcaption>` : ''}
      </figure>`).join('');

    return `
      <article data-paper="${esc(p.paper || '')}">
        <section class="wrap project-hero">
          ${topline(`<span class="crumbs"><a href="#/">Work</a> / <span>${esc(p.discipline)}</span> / <span>${projectNum(i)}</span></span>`, esc(p.type || ''))}
          <h1 class="project-title">${esc(p.title)}</h1>
          ${p.note ? `<p class="hand project-note">${esc(p.note)} ↗</p>` : ''}
          ${coverOf(p) ? `
          <div class="project-cover">
            <button class="gallery-btn" data-lb-index="0" aria-label="View larger: ${esc(p.title)}">
              <div class="frame">${tapeHtml(0)}<div class="frame-img"><img src="${esc(coverOf(p))}" alt="${esc((first && first.caption) || p.title)}"></div></div>
            </button>
          </div>` : ''}
        </section>

        <section class="wrap project-body">
          <dl class="meta-list mono reveal">
            ${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}
          </dl>
          <div class="reveal">
            ${p.summary ? `<p class="project-lede">${esc(p.summary)}</p>` : ''}
            <div class="project-text">${(p.description || []).map((t) => `<p>${esc(t)}</p>`).join('')}</div>
          </div>
        </section>

        ${gallery ? `<section class="wrap gallery" aria-label="Project images">${gallery}</section>` : ''}

        ${S.projects.length > 1 ? `
        <div class="wrap">
          <a class="next-project" href="#/work/${esc(next.slug)}">
            <span class="mono">Next project — ${esc(next.discipline)}</span>
            <p class="display">${esc(next.title)} <span class="arrow">→</span></p>
          </a>
        </div>` : ''}
      </article>`;
  }

  function viewAbout() {
    const a = S.about;
    const portrait = S.portrait
      ? `<img src="${esc(S.portrait)}" alt="Portrait of ${esc(S.name)}">`
      : `<div class="portrait-empty" aria-hidden="true">Z<span>A</span>M</div>`;
    return `
      <section class="wrap page-head">
        ${topline('About', 'Introduction')}
        <h1 class="page-title">About</h1>
      </section>
      <section class="wrap about-grid">
        <div class="portrait reveal">
          <div class="frame">${tapeHtml(1)}<div class="frame-img">${portrait}</div></div>
        </div>
        <div class="reveal">
          <h2 class="about-statement">${esc(a.statement)}</h2>
          <p class="hand about-note">making things differently ↗</p>
          <div class="about-text">${a.paragraphs.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
          <dl class="details mono">
            ${a.details.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
          </dl>
          <p style="margin-top:36px"><a class="btn" href="#/cv">View CV →</a></p>
        </div>
      </section>`;
  }

  function viewCV() {
    const projectLink = (title) => {
      const p = S.projects.find((x) => x.title === title);
      return p ? `<a href="#/work/${esc(p.slug)}">${esc(title)}</a>` : esc(title);
    };
    const blocks = S.cv.map((b, i) => `
      <div class="cv-block reveal">
        <h2 class="mono"><span class="n">${pad(i + 1)}</span>${esc(b.heading)}</h2>
        <ul class="cv-items">
          ${b.items.map((it) => `
            <li>
              <span><span class="t">${projectLink(it.title)}</span>${it.note ? `<br><span class="m">${esc(it.note)}</span>` : ''}</span>
              ${it.meta ? `<span class="mono m">${esc(it.meta)}</span>` : ''}
            </li>`).join('')}
        </ul>
      </div>`).join('');
    return `
      <section class="wrap page-head">
        ${topline('Curriculum Vitae', esc(S.name))}
        <h1 class="page-title">CV</h1>
      </section>
      <section class="wrap cv">
        <div class="section-head" style="border:0;margin-bottom:24px">
          <p class="hand" style="font-size:32px;margin:0;transform:rotate(-2deg)">always in progress…</p>
          <div class="cv-actions">
            ${S.cvPdf ? `<a class="btn solid" href="${esc(S.cvPdf)}" download>Download PDF ↓</a>` : ''}
            <button class="btn" data-action="print">Print</button>
          </div>
        </div>
        ${blocks}
      </section>`;
  }

  function viewContact() {
    return `
      <section class="wrap page-head contact">
        ${topline('Contact', 'Get in touch')}
        <h1 class="contact-title">Let’s make<br>something<br><em>different.</em></h1>
        <p class="hand contact-note">say hello ↘</p>
        <div class="contact-list">
          <div class="contact-row">
            <a class="big" href="mailto:${esc(S.email)}">${esc(S.email)}</a>
            <button class="btn copy-btn" data-copy="${esc(S.email)}">Copy</button>
          </div>
          ${S.links.map((l) => `
          <a class="contact-row" href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">
            <span class="big" style="font:400 clamp(26px,4.4vw,60px)/1.1 var(--serif)">${esc(l.label)}</span>
            <span class="arrow" aria-hidden="true">↗</span>
          </a>`).join('')}
        </div>
      </section>`;
  }

  function viewNotFound() {
    return `
      <section class="wrap lost">
        ${topline('404', 'Page not found')}
        <h1 class="page-title">Lost?</h1>
        <p class="hand" style="font-size:36px;transform:rotate(-2deg)">this page wandered off ↘</p>
        <a class="btn" href="#/">Back to the work →</a>
      </section>`;
  }

  /* ---------- router ---------- */

  function parse() {
    const h = location.hash.replace(/^#\/?/, '');
    // Old single-page links (#about, #armor, …) keep working.
    const legacy = { home: '', contents: '', clothing: '', architecture: 'work/sculptors-rest', armor: 'work/armor', shoulders: 'work/shoulders', resume: 'cv' };
    const path = h in legacy ? legacy[h] : h;
    const [a, b] = path.split('/');
    return { a: a || 'home', b };
  }

  let lastRoute = '';
  function render() {
    const { a, b } = parse();
    const route = a + '/' + (b || '');
    let html, title, paper = '';

    if (a === 'home' || a === 'works') { html = viewHome(); title = ''; }
    else if (a === 'work' && b) {
      html = viewProject(b);
      const p = S.projects.find((x) => x.slug === b);
      title = p ? p.title : 'Not found';
      paper = p ? p.paper || '' : '';
    }
    else if (a === 'about') { html = viewAbout(); title = 'About'; }
    else if (a === 'cv') { html = viewCV(); title = 'CV'; }
    else if (a === 'contact') { html = viewContact(); title = 'Contact'; }
    else { html = viewNotFound(); title = 'Not found'; }

    // Skip re-render when only an in-page anchor changed.
    if (route === lastRoute) return;
    lastRoute = route;

    app.innerHTML = `<div class="view">${html}</div>`;
    document.title = title ? `${title} — ${S.name}` : `${S.name} — Portfolio`;
    document.body.className = paper ? 'paper-' + paper : '';

    document.querySelectorAll('[data-nav]').forEach((el) => {
      const on = el.dataset.nav === (a === 'work' || a === 'works' ? 'home' : a);
      el.classList.toggle('active', on);
      on ? el.setAttribute('aria-current', 'page') : el.removeAttribute('aria-current');
    });

    closeMenu();
    window.scrollTo({ top: 0, behavior: 'instant' });
    app.focus({ preventScroll: true });
    observeReveals();
    bindView();
  }

  /* ---------- interactions ---------- */

  let io;
  function observeReveals() {
    const els = app.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    io && io.disconnect();
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    // Anything already on screen shows right away; the rest fades in on scroll.
    const vh = window.innerHeight;
    els.forEach((e) => {
      if (e.getBoundingClientRect().top < vh) e.classList.add('in');
      else io.observe(e);
    });
  }

  function bindView() {
    app.querySelectorAll('[data-filter]').forEach((btn) => btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      app.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      app.querySelectorAll('.work-card').forEach((c) => {
        c.hidden = f !== '*' && c.dataset.discipline !== f;
        c.classList.add('in');
      });
    }));

    app.querySelectorAll('[data-scroll]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById(a.dataset.scroll).scrollIntoView({ behavior: 'smooth' });
    }));

    app.querySelectorAll('[data-copy]').forEach((btn) => btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(btn.dataset.copy); toast('Email copied'); }
      catch { location.href = 'mailto:' + btn.dataset.copy; }
    }));

    app.querySelectorAll('[data-action="print"]').forEach((b) => b.addEventListener('click', () => window.print()));

    app.querySelectorAll('[data-lb-index]').forEach((b) => b.addEventListener('click', () => {
      const p = S.projects.find((x) => x.slug === parse().b);
      if (!p) return;
      const list = p.cover ? [{ src: p.cover, caption: p.title }, ...p.images] : p.images;
      openLightbox(list, +b.dataset.lbIndex);
    }));
  }

  let toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast mono'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }

  /* ---------- lightbox ---------- */

  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCaption');
  const lbCount = document.getElementById('lbCount');
  let lbList = [], lbI = 0, lbReturn = null;

  function openLightbox(list, i) {
    lbList = list; lbReturn = document.activeElement;
    lb.classList.toggle('single', list.length < 2);
    showLb(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  }
  function showLb(i) {
    lbI = (i + lbList.length) % lbList.length;
    const it = lbList[lbI];
    lbImg.src = it.src;
    lbImg.alt = it.alt || it.caption || '';
    lbCap.textContent = it.caption || '';
    lbCount.textContent = `${pad(lbI + 1)} / ${pad(lbList.length)}`;
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = '';
    lbReturn && lbReturn.focus();
  }
  lb.addEventListener('click', (e) => {
    const act = e.target.closest('[data-lb]');
    if (act) {
      const a = act.dataset.lb;
      if (a === 'close') closeLb();
      else showLb(lbI + (a === 'next' ? 1 : -1));
    } else if (e.target === lb || e.target.classList.contains('lb-figure')) closeLb();
  });
  let tx = null;
  lb.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) showLb(lbI + (dx < 0 ? 1 : -1));
    tx = null;
  });
  document.addEventListener('keydown', (e) => {
    if (!lb.hidden) {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') showLb(lbI + 1);
      if (e.key === 'ArrowLeft') showLb(lbI - 1);
      if (e.key === 'Tab') { // keep focus inside
        const f = [...lb.querySelectorAll('button')].filter((b) => getComputedStyle(b).visibility !== 'hidden');
        const idx = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(idx + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    } else if (e.key === 'Escape' && !mobileMenu.hidden) closeMenu();
  });

  /* ---------- menu & header ---------- */

  function closeMenu() {
    mobileMenu.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.querySelector('.menu-btn-label').textContent = 'Menu';
    document.body.style.overflow = '';
  }
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.hidden;
    if (!open) return closeMenu();
    mobileMenu.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.querySelector('.menu-btn-label').textContent = 'Close';
    document.body.style.overflow = 'hidden';
  });

  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 10);
    header.classList.toggle('hide', y > 300 && y > lastY && mobileMenu.hidden);
    lastY = y;
  }, { passive: true });

  /* ---------- footer & boot ---------- */

  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('footerLinks').innerHTML =
    `<a href="mailto:${esc(S.email)}">Email</a>` +
    S.links.map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ↗</a>`).join('');

  window.addEventListener('hashchange', render);
  render();
})();
