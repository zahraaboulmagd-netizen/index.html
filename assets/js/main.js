/*
  Portfolio app — renders views from content.js.
  Routes (hash-based so GitHub Pages needs no server config):
    #/                landing + table of contents
    #/work            all projects
    #/clothing        projects in one discipline (any discipline, lowercased)
    #/work/<slug>     project page
    #/about  #/experience  #/contact
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
  const projectNum = (p) => String(S.projects.indexOf(p) + 1).padStart(3, '0');
  const tapes = ['tl tr', 'tc', 'tl', 'tr', 'tc'];
  const tapeHtml = (i) => tapes[i % tapes.length].split(' ').map((t) => `<span class="tape ${t}"></span>`).join('');
  const tilt = (i) => [-1.4, 1.2, -0.6, 1.6, -1][i % 5] + 'deg';
  const disciplines = [...new Set(S.projects.map((p) => p.discipline))];
  const discName = (d) => (S.disciplineNames && S.disciplineNames[d]) || d;
  const discSlug = (d) => d.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  function topline(left, right) {
    return `<div class="topline mono"><span>${left}</span><span>${right}</span></div>`;
  }

  function portraitFrame(i) {
    const inner = S.portrait
      ? `<img src="${esc(S.portrait)}" alt="Portrait of ${esc(S.name)}">`
      : `<div class="portrait-empty" aria-hidden="true">Z<span>A</span>M</div>`;
    return `<div class="frame">${tapeHtml(i)}<div class="frame-img">${inner}</div></div>`;
  }

  /* ---------- views ---------- */

  function viewHome() {
    // Table of contents: About, one entry per discipline (with its projects), Experience, Contact.
    const entries = [
      { href: '#/about', label: 'About' },
      ...disciplines.map((d) => ({
        href: '#/' + discSlug(d),
        label: discName(d),
        children: S.projects.filter((p) => p.discipline === d)
      })),
      { href: '#/experience', label: 'Experience' },
      { href: '#/contact', label: 'Contact' }
    ];
    const toc = entries.map((e, i) => `
      <li>
        <a class="toc-link" href="${e.href}">
          <span class="mono toc-num">${pad(i + 1)}</span>
          <span class="toc-label">${esc(e.label)}</span>
          <span class="toc-arrow" aria-hidden="true">→</span>
        </a>
        ${e.children ? `<ul class="toc-sub">${e.children.map((p) =>
          `<li><a href="#/work/${esc(p.slug)}">${esc(p.title)}</a></li>`).join('')}</ul>` : ''}
      </li>`).join('');

    return `
      <section class="wrap landing">
        ${topline('Portfolio / Selected Works', esc(S.location) + ' — NY')}
        <div class="landing-grid">
          <div class="landing-main">
            <h1 class="hero-title" aria-label="${esc(S.name)}">
              <span class="line"><span>${esc(S.firstName)}</span></span>
              <span class="line"><span>${esc(S.lastName)}<span class="asterisk" aria-hidden="true">✳</span></span></span>
            </h1>
            <p class="hand hero-note">design, objects, spaces &amp; everything in between ↘</p>
            <div class="landing-intro">
              <div class="portrait landing-portrait">${portraitFrame(1)}</div>
              <div>
                <p class="hero-intro">${esc(S.intro)}</p>
                ${S.quote ? `
                <figure class="landing-quote">
                  <blockquote>“${esc(S.quote.text)}”</blockquote>
                  <figcaption class="hand">— ${esc(S.quote.author)}</figcaption>
                </figure>` : ''}
              </div>
            </div>
          </div>
          <nav class="toc" aria-label="Table of contents">
            <h2 class="mono toc-title">Table of Contents</h2>
            <ol>${toc}</ol>
            <p class="hand toc-note">choose where to wander ↗</p>
          </nav>
        </div>
      </section>`;
  }

  function viewWork(discipline) {
    const list = discipline ? S.projects.filter((p) => p.discipline === discipline) : S.projects;
    const title = discipline ? discName(discipline) : 'Selected Works';
    const tabs = [['#/work', 'All', !discipline], ...disciplines.map((d) => ['#/' + discSlug(d), discName(d), d === discipline])];
    const cards = list.map((p, i) => `
      <a class="work-card reveal" href="#/work/${esc(p.slug)}">
        <div class="frame" style="--tilt:${tilt(i)}">
          ${tapeHtml(i)}
          <div class="frame-img"><img src="${esc(p.images[0] && p.images[0].src)}" alt="${esc(p.title)}" loading="${i < 2 ? 'eager' : 'lazy'}"></div>
        </div>
        <div class="work-info">
          <span class="mono work-num">${projectNum(p)}</span>
          <h3 class="work-title">${esc(p.title)}</h3>
          <span class="work-arrow" aria-hidden="true">↗</span>
          <span class="mono work-sub">${esc(discName(p.discipline))}${p.credit ? ' — ' + esc(p.credit[p.credit.length - 1]) : ''}</span>
          ${p.subtitle ? `<p class="work-summary">${esc(p.subtitle)}</p>` : ''}
        </div>
      </a>`).join('');

    return `
      <section class="wrap page-head">
        ${topline('<a href="#/">Contents</a> / Work', `${pad(list.length)} project${list.length === 1 ? '' : 's'}`)}
        <h1 class="page-title">${esc(title)}</h1>
      </section>
      <section class="wrap works">
        <div class="section-head">
          <p class="hand" style="font-size:32px;margin:0;transform:rotate(-2deg)">select a project to explore ↘</p>
          <nav class="filters" aria-label="Filter by discipline">
            ${tabs.map(([h, l, on]) => `<a class="filter" href="${h}"${on ? ' aria-current="page"' : ''}>${esc(l)}</a>`).join('')}
          </nav>
        </div>
        <div class="work-grid">${cards}</div>
      </section>`;
  }

  function viewProject(slug) {
    const i = S.projects.findIndex((p) => p.slug === slug);
    if (i < 0) return viewNotFound();
    const p = S.projects[i];
    const next = S.projects[(i + 1) % S.projects.length];
    const [cover, ...rest] = p.images;

    const fig = (img, k, cls) => `
      <figure class="${cls}">
        <button class="gallery-btn" data-lb-index="${k}" aria-label="View larger: ${esc(img.caption || p.title)}">
          <div class="frame" style="--tilt:${['-0.6deg', '0.6deg', '-0.4deg'][k % 3]}">
            ${k === 0 ? tapeHtml(0) : ''}
            <div class="frame-img"><img src="${esc(img.src)}" alt="${esc(img.alt || img.caption || p.title)}" ${k ? 'loading="lazy"' : ''}></div>
          </div>
        </button>
        ${img.caption ? `<figcaption><span class="mono">Fig. ${pad(k + 1)}</span><span>${esc(img.caption)}</span></figcaption>` : ''}
      </figure>`;

    return `
      <article>
        <section class="wrap project-hero">
          ${topline(`<span class="crumbs"><a href="#/">Contents</a> / <a href="#/${discSlug(p.discipline)}">${esc(discName(p.discipline))}</a> / <span>${projectNum(p)}</span></span>`, 'Project ' + projectNum(p))}
          ${p.keywords && p.keywords.length ? `
          <div class="keywords">
            <span class="mono keywords-label">Key words</span>
            <ul>${p.keywords.map((k) => `<li class="mono">${esc(k)}</li>`).join('')}</ul>
          </div>` : ''}
          <h1 class="project-title">${esc(p.title)}</h1>
          ${p.subtitle ? `<p class="project-subtitle">${esc(p.subtitle)}</p>` : ''}
          ${p.credit ? `<p class="mono project-credit">${p.credit.map(esc).join('<span class="sep">/</span>')}</p>` : ''}
          ${p.note ? `<p class="hand project-note">${esc(p.note)} ↗</p>` : ''}
          ${cover ? `<div class="project-cover">${fig(cover, 0, '')}</div>` : ''}
        </section>

        <section class="wrap project-body">
          <h2 class="mono summary-label reveal">Project Summary</h2>
          <div class="project-text reveal">${(p.summary || []).map((t) => `<p>${esc(t)}</p>`).join('')}</div>
        </section>

        ${rest.length ? `<section class="wrap gallery" aria-label="Project images">${rest.map((img, k) => fig(img, k + 1, 'reveal')).join('')}</section>` : ''}

        ${S.projects.length > 1 ? `
        <div class="wrap">
          <a class="next-project" href="#/work/${esc(next.slug)}">
            <span class="mono">Next project — ${esc(discName(next.discipline))}</span>
            <p class="display">${esc(next.title)} <span class="arrow">→</span></p>
          </a>
        </div>` : ''}
      </article>`;
  }

  function viewAbout() {
    const a = S.about;
    return `
      <section class="wrap page-head">
        ${topline('<a href="#/">Contents</a> / About', 'Introduction')}
        <h1 class="page-title">About</h1>
      </section>
      <section class="wrap about-grid">
        <div class="portrait reveal">${portraitFrame(1)}</div>
        <div class="reveal">
          <h2 class="about-statement">${esc(a.statement)}</h2>
          <p class="hand about-note">making things differently ↗</p>
          <div class="about-text">${a.paragraphs.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
          <dl class="details mono">
            ${a.details.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
          </dl>
          <p style="margin-top:36px"><a class="btn" href="#/experience">View experience →</a></p>
        </div>
      </section>`;
  }

  function viewExperience() {
    const jobs = S.experience.map((x, i) => `
      <li class="xp reveal">
        <span class="mono xp-num">${pad(i + 1)}</span>
        <div class="xp-main">
          <h3 class="xp-org">${esc(x.org)}</h3>
          ${x.role ? `<p class="xp-role">${esc(x.role)}</p>` : ''}
          ${x.roles ? `<ul class="xp-roles">${x.roles.map((r) =>
            `<li><span>${esc(r.title)}</span><span class="mono">${esc(r.date)}</span></li>`).join('')}</ul>` : ''}
        </div>
        <div class="mono xp-meta">
          ${x.location ? `<span>${esc(x.location)}</span>` : ''}
          ${x.date ? `<span>${esc(x.date)}</span>` : ''}
        </div>
      </li>`).join('');

    const wins = (S.accomplishments || []).map((a) => `
      <li class="award reveal">
        <span class="award-star" aria-hidden="true">✳</span>
        <div>
          <h3 class="xp-org">${esc(a.title)}</h3>
          <p class="mono award-date">${esc(a.date)}</p>
          <p class="award-text">${esc(a.text)}</p>
        </div>
      </li>`).join('');

    return `
      <section class="wrap page-head">
        ${topline('<a href="#/">Contents</a> / Experience', esc(S.name))}
        <h1 class="page-title">Experience</h1>
        <p class="hand" style="font-size:32px;margin:18px 0 0;transform:rotate(-2deg)">always in progress…</p>
      </section>
      <section class="wrap experience">
        <div class="section-head"><h2 class="section-title">Work &amp; Volunteering</h2></div>
        <ol class="xp-list">${jobs}</ol>
        ${wins ? `
        <div class="section-head" style="margin-top:clamp(64px,9vw,120px)"><h2 class="section-title">Accomplishments</h2></div>
        <ul class="award-list">${wins}</ul>` : ''}
      </section>`;
  }

  function viewContact() {
    return `
      <section class="wrap page-head contact">
        ${topline('<a href="#/">Contents</a> / Contact', 'Get in touch')}
        <div class="contact-grid">
          <div>
            <h1 class="contact-title">Let’s make<br>something<br><em>different.</em></h1>
            <p class="hand contact-note">say hello ↘</p>
            <p class="contact-alt">Prefer email? Write to<br><a href="mailto:${esc(S.email)}">${esc(S.email)}</a></p>
          </div>
          <form class="contact-form" id="contactForm" novalidate>
            <h2 class="mono form-title">Contact request</h2>
            <label class="field">
              <span class="mono">Your name</span>
              <input name="name" type="text" autocomplete="name" required>
            </label>
            <label class="field">
              <span class="mono">Email address</span>
              <input name="email" type="email" autocomplete="email" inputmode="email" required>
            </label>
            <label class="field">
              <span class="mono">Inquiry</span>
              <textarea name="message" rows="6" required></textarea>
            </label>
            <input type="text" name="_honey" class="honey" tabindex="-1" autocomplete="off" aria-hidden="true">
            <p class="form-status" id="formStatus" role="status"></p>
            <button class="btn solid" type="submit">Send request →</button>
          </form>
        </div>
      </section>`;
  }

  function viewNotFound() {
    return `
      <section class="wrap lost">
        ${topline('404', 'Page not found')}
        <h1 class="page-title">Lost?</h1>
        <p class="hand" style="font-size:36px;transform:rotate(-2deg)">this page wandered off ↘</p>
        <a class="btn" href="#/">Back to contents →</a>
      </section>`;
  }

  /* ---------- router ---------- */

  function parse() {
    const h = location.hash.replace(/^#\/?/, '');
    // Old links (#about, #armor, #cv, …) keep working.
    const legacy = { home: '', contents: '', works: 'work', armor: 'work/armor', shoulders: 'work/shoulders', resume: 'experience', cv: 'experience' };
    const path = h in legacy ? legacy[h] : h;
    const [a, b] = path.split('/');
    return { a: a || 'home', b };
  }

  let lastRoute = '';
  function render() {
    const { a, b } = parse();
    const route = a + '/' + (b || '');
    if (route === lastRoute) return;
    lastRoute = route;

    const disc = disciplines.find((d) => discSlug(d) === a);
    let html, title, paper = '', nav = a;

    if (a === 'home') { html = viewHome(); title = ''; }
    else if (a === 'work' && b) {
      html = viewProject(b);
      const p = S.projects.find((x) => x.slug === b);
      title = p ? p.title : 'Not found';
      paper = p ? p.paper || '' : '';
      nav = 'work';
    }
    else if (a === 'work') { html = viewWork(); title = 'Work'; }
    else if (disc) { html = viewWork(disc); title = discName(disc); nav = 'work'; }
    else if (a === 'about') { html = viewAbout(); title = 'About'; }
    else if (a === 'experience') { html = viewExperience(); title = 'Experience'; }
    else if (a === 'contact') { html = viewContact(); title = 'Contact'; }
    else { html = viewNotFound(); title = 'Not found'; }

    app.innerHTML = `<div class="view">${html}</div>`;
    document.title = title ? `${title} — ${S.name}` : `${S.name} — Portfolio`;
    document.body.className = paper ? 'paper-' + paper : '';

    document.querySelectorAll('[data-nav]').forEach((el) => {
      const on = el.dataset.nav === nav;
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
    app.querySelectorAll('[data-lb-index]').forEach((b) => b.addEventListener('click', () => {
      const p = S.projects.find((x) => x.slug === parse().b);
      if (p) openLightbox(p.images, +b.dataset.lbIndex);
    }));

    const form = document.getElementById('contactForm');
    if (form) form.addEventListener('submit', submitContact);
  }

  /* ---------- contact form ----------
     GitHub Pages can't receive form posts, so messages are relayed by
     FormSubmit (formsubmit.co) to S.email. The very first message triggers
     a one-time activation email to that inbox — click the link in it.
     If the service is unreachable, the visitor's mail app opens instead. */

  async function submitContact(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const status = document.getElementById('formStatus');
    const btn = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form));

    form.querySelectorAll('[required]').forEach((f) => f.classList.toggle('invalid', !f.checkValidity()));
    if (!form.checkValidity()) {
      status.textContent = 'Please fill in your name, a valid email and your inquiry.';
      status.className = 'form-status error';
      form.querySelector('.invalid').focus();
      return;
    }
    if (data._honey) return; // bot

    btn.disabled = true;
    status.textContent = 'Sending…';
    status.className = 'form-status';

    try {
      const res = await fetch('https://formsubmit.co/ajax/' + encodeURIComponent(S.email), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _replyto: data.email,
          _subject: `Portfolio inquiry from ${data.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) === 'false') throw new Error(json.message || res.status);
      form.reset();
      status.textContent = 'Thank you — your message was sent. I’ll be in touch soon.';
      status.className = 'form-status ok';
    } catch (err) {
      const body = `${data.message}\n\n— ${data.name} (${data.email})`;
      status.innerHTML = `Couldn’t send just now. <a href="mailto:${esc(S.email)}?subject=${encodeURIComponent('Portfolio inquiry from ' + data.name)}&body=${encodeURIComponent(body)}">Send it by email instead →</a>`;
      status.className = 'form-status error';
    } finally {
      btn.disabled = false;
    }
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
    if (!mobileMenu.hidden) return closeMenu();
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
    `<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>` +
    S.links.map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ↗</a>`).join('') +
    `<a href="#/contact">Contact form</a>`;

  window.addEventListener('hashchange', render);
  render();
})();
