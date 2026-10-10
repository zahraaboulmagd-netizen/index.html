# Zahra Aboul-Magd — Portfolio

Static site for GitHub Pages. No build step — edit files, commit, done.

## Editing content
Everything (bio, experience, projects, links) lives in **`assets/js/content.js`**.

### Add photos to a project
1. Upload images to `assets/img/<project>/` (e.g. `assets/img/armor/look-01.jpg`).
2. In `content.js`, replace that project's placeholder `.svg` entries:
   ```js
   { src: 'assets/img/armor/look-01.jpg', caption: 'Look 01, front', wide: true },
   ```
   - First image = cover on the home page. `wide: true` = full-width in the gallery.
   - Keep photos ~2000px on the long edge, JPG/WebP, under ~500 KB each.

### Add a project
Copy a `{ slug: ..., title: ... }` block in `projects`. Every project has the same
layout: key words, title, subtitle, credit line, summary, three images. `paper: 'pattern'` gives the
pattern-paper background, `paper: 'drafting'` gives the architecture grid.

### Photo of yourself
Upload it to `assets/img/` and set `portrait: 'assets/img/me.jpg'` in `content.js`.
It appears on the landing page and the About page.

### Experience & accomplishments
Edit the `experience` and `accomplishments` lists in `content.js`.

### Contact form
Messages are delivered to the email in `content.js` via FormSubmit (formsubmit.co).
**The first message sent triggers a one-time "Activate Form" email — click the link in it**,
then all later messages arrive normally. Check spam if you don't see it.

## Structure
```
index.html            page shell
assets/css/style.css  all styling
assets/js/content.js  ← edit this
assets/js/main.js     router, gallery lightbox, menu
assets/img/           images
```

## Preview locally
`python3 -m http.server` then open http://localhost:8000
