# Smart card

A minimal GitHub Pages app to create, preview, share, edit, and delete "smart cards" with a 2:3 aspect ratio. Deleted items move to the Trash bin page. Dark mode and a collapsible, auto-hidden sidebar included.

## Features
- Collapsible auto-hidden sidebar with Home, Create New, Trash Bin, and Dark Mode.
- Home screen shows cards in a 2:3 ratio grid.
- Create new card: rounded profile photo under name and profession; optional fields (name, profession, contact, alternate contact, email, address, relation, other notes).
- Share icon: export a card as a PNG image (Web Share API if supported, otherwise download).
- Edit and Delete icons on each card; deletes move to Trash.
- Trash bin page to restore or delete forever.
- LocalStorage persistence; fully client-side.

## Deploy on GitHub Pages
1. Create a new GitHub repository and add all files.
2. Commit and push.
3. In repository Settings → Pages, choose the branch (e.g., `main`) and root directory.
4. Visit the published URL.

## Notes
- Image sharing uses Canvas; no external libraries required.
- Dark mode preference is saved in localStorage.
- Works offline in modern browsers; no backend.
