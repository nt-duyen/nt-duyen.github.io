# Thi Duyen Nguyen — personal website

This is a lightweight, dependency-free personal homepage for GitHub Pages.

## Preview

Open `index.html` in a browser. To preview the activity feed locally, use a small
local web server (for example, `python3 -m http.server`) and visit
`http://localhost:8000`; browsers do not allow `fetch()` to load JSON from a
`file://` page.

## Publish On GitHub Pages

1. Create a GitHub repository named `nt-duyen.github.io`.
2. Push the repository contents to the `main` branch.
3. In GitHub, open the repository settings and make sure Pages is publishing from the `main` branch.

Your site will appear at:

```text
https://nt-duyen.github.io
```

## Add An Activity

News activities live in [`data/activities.json`](data/activities.json), so adding
one does not require editing the page layout:

1. Copy an existing activity object in the JSON file.
2. Update `date` and `datetime` (use a sortable value such as `2026-10`).
3. Replace the `items` text parts. Give linked parts a `href`; plain text parts
   only need `text`.
4. Add images under `galleries` when needed. Galleries can belong to the
   activity or to an individual item when they need to appear beside that
   item's text. Each gallery has a layout such as `one-photo` or `two-photos`,
   and every image needs a relative `src` and descriptive `alt` text.
5. Add the newest activity at the top, then validate that the JSON remains valid.

Example:

```json
{
  "date": "October 2026",
  "datetime": "2026-10",
  "items": [
    {
      "parts": [
        { "text": "Presented at the " },
        { "text": "Example Conference", "href": "https://example.com" },
        { "text": ", China." }
      ]
    }
  ]
}
```

Keep image paths relative to the repository root, such as
`assets/my-activity.jpg`. The renderer creates the same accessible timeline
markup and external-link behavior as the rest of the site.

## Edit Other Content

The other portfolio sections remain in `index.html`.

Change these first:

- research links
- publication titles
- email, GitHub, Google Scholar, and CV links

## Replace The CV

The CV link points to:

```text
assets/cv.pdf
```

Replace that file with a newer CV whenever you want to update it.
