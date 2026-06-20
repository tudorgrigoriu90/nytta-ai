# Nytta AI — Website

A static, single-page website for Nytta AI (AI counselling for small businesses), built for GitHub Pages — no build step required.

## Structure

```
.
├── index.html        # All page content, in English, Swedish and Arabic
├── assets/
│   ├── style.css      # All styling (Claude-inspired palette: black / gray / orange / white)
│   └── main.js         # Language switching + mobile nav toggle
└── .nojekyll          # Tells GitHub Pages to serve files as-is
```

## Languages

English, Swedish and Arabic content all live in `index.html`, marked with `data-i18n="en|sv|ar"`.
CSS shows/hides the right block based on `<html lang="...">`. Arabic also flips the page to `dir="rtl"`
automatically. The language picked up first is based on the visitor's browser language, then remembered
in `localStorage` after they pick one manually.

To edit copy: search for `data-i18n="en"` (or `sv` / `ar`) in `index.html` — each piece of text appears
three times in a row, once per language, right next to each other.

## Contact details

Phone / WhatsApp number is `+46 70 797 65 92`, wired as:
- `tel:+46707975592` — opens the phone dialer
- `https://wa.me/46707975592` — opens WhatsApp directly

To change the number, replace it in `index.html` (search for `707975592`) — it appears in the hero
buttons, the contact cards, and the sticky bottom contact bar.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Push these files to the repository root (or to a `/docs` folder — see note below).
3. In the repo: **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**.
5. Pick the branch (usually `main`) and the folder (`/ (root)` or `/docs`).
6. Save. GitHub will publish the site at `https://<username>.github.io/<repo-name>/` within a minute or two.

If you want the site at the root of a custom domain or `<username>.github.io`, name the repository
`<username>.github.io` and push these files to its root.

### Custom domain (optional)

Add a `CNAME` file to the root containing just your domain (e.g. `nyttaai.se`), then point your DNS
`A`/`CNAME` records at GitHub Pages per [GitHub's instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Local preview

No build tools needed — just serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes

- No external fonts are loaded over the network (system font stack) — fast load, no flash of unstyled text.
- The sticky Call / WhatsApp bar stays visible at all times, including on scroll, on both mobile and desktop.
- Fully keyboard-navigable with visible focus states; respects `prefers-reduced-motion`.
