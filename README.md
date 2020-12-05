# NxN Board

Open `index.html` file in your browser. Except it, there are 2 main files: `index.js` and `index.css`.

## JavaScript

`index.js` file contains all the JavaScript code. Flow goes like this:

1. User selects the level
2. Start button is enabled and user clicks it
3. Based on level, a grid is drawn using `<table>` structure
4. A timer with help of `setInterval` is created for 120s
5. A click handler is added on each cell `<td>` of `<table>`
6. To show highlighting, a random number is generated between 0 and 3 and based on that row and cell is fetched. And cell is highlighted using `.highlight` class
7. If user clicks on highlighted cell, score increases else decreases
8. After 120s, a `confirm` is shown with `Game over` message
9. If user clicks on `Ok` in above confirm, game is restarted
10. Highscore is maintained in `localStorage`
