# Bug Mohol - Cyberpunk Interactive Terminal 👾

A futuristic, single-page command-line-styled website built with pure HTML, CSS, and Vanilla JavaScript. This project heavily relies on a cyberpunk and hacker/cyber-security aesthetic, complete with CSS glitch animations, interactive command prompts, and a floating glassmorphism UI.

## ✨ Features

- **Interactive Terminal Interface**: A fully working faux command-line interface directly in the browser that responds to user inputs.
- **Advanced Bengali Grapheme Support**: Implements `Intl.Segmenter` under the hood to ensure complex Bengali ligatures (যুক্তাক্ষর) format perfectly during the typewriter effect without breaking.
- **Glassmorphism Menubar**: A sleek, floating frosted glass navigation bar with blur filters and glossy semi-transparent borders.
- **Subtle CSS Glitch Animations**: A beautiful slice-based CSS glitch effect applied to the central logo, using layered pseudo-elements, `clip-path` interpolations, and `drop-shadow`.
- **CRT Ambience**: A custom CSS radial gradient and linear-gradient background mimicking retro CRT screen scanlines.

## 🚀 Interactive Commands

Once the boot sequence loads, the following commands are available internally:

- `help` : Lists all available command options.
- `about` : Displays info about Bug Mohol.
- `contact` : Shows the organization's mock email and phone details.
- `founder` : Displays founder information.
- `clear` : Erases terminal output history.
- `sudo` : _[Classified]_ Try it out to see the cyber warning.

_Note: Clicking the items on the glass menubar will automatically execute their respective terminal commands!_

## 🛠️ Tech Stack

- **HTML5**: Semantic tags, accessible structure.
- **CSS3**: Variables, Flexbox, Keyframe Animations, Backdrop-filters.
- **Vanilla JS**: DOM manipulation, event listeners, fake timeouts, and `Intl.Segmenter`.

## 📂 Installation & Usage

Since this is a client-side only static application, no build tools are necessary.

1. Clone or download the repository.
2. Ensure you have the provided `.png` and `/favicon` files in the root folder structure.
3. Open `index.html` in your favorite modern browser (Chrome, Firefox, Edge, Safari).

## 📝 License

Designed and developed for Bug Mohol. Standard GNU Public License / Open Source.
