# VSCode Webview React (+ esbuild, + tachyons, + web server)

This project was originally forked from [rebornix/vscode-webview-react](https://rebornix/vscode-webview-react), then updated to have modern React dependencies, removed all mentions of CRA and other scripts, to include a custom script to build assets using [ESbuild](https://github.com/evanw/esbuild). I then added in [tachyons](https://tachyons.io) to deal with styling, and [Modern Web's dev server](https://github.com/modernweb-dev/web) to handle quick refresh when developing. CSS already works out of the box with ESbuild but could be extended with post-css or something in the future.

- Original README will provide more informations about this project.
- `watch` let esbuild watch for changes, but VSCode requires reloading the view.
- `start` starts the dev server. Since each theme is different, be careful when styling.
- Additional resources to be included into the view can be added in the method called `_getHtmlForWebview`.