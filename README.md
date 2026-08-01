# Magiq Worqs

This repository contains the static Magiq Worqs website. It is ready for GitHub Pages: the homepage is [`index.html`](index.html), with its styles in `styles.css` and interactions in `script.js`.

## Publish with GitHub Pages

1. Create a GitHub repository and push this folder to a `main` branch.
2. In the repository, open **Settings** → **Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. GitHub will automatically run the workflow in `.github/workflows/deploy-pages.yml` and publish the site.

GitHub will provide the public website address after the deployment finishes.

The `.nojekyll` file tells GitHub Pages to serve the site exactly as static HTML, CSS, JavaScript, and image files.
