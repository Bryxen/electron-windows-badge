# Electron Windows Badge

Electron Windows Badge plugin to access and modify the badge number of the app icon in windows.

<p align="center">
  <img src='demo.gif' alt='demo'/>
</p>

## Installation

$ npm i electron-windows-badge --save

## Usage

    1) Require electron-windows-badge in your main process:
        const Badge = require('electron-windows-badge');

    2) Initialize new object of badge while creating window:
        function createWindow () {
            win = new BrowserWindow({width: 800, height: 600});
            const badgeOptions = {}
            new Badge(win, badgeOptions);
        }

    3) To update the badge you just need to call this(you must do it in render process):
        ipcRenderer.sendSync('update-badge', 1);

    4) To remove badge just call this(you must do it in render process):
        ipcRenderer.sendSync('update-badge', null);

#### Usage on Main Process

    1) Require electron-windows-badge in your main process:
        const Badge = require('electron-windows-badge');

    2) Initialize new object of badge while creating window:
        function createWindow () {
            win = new BrowserWindow({width: 800, height: 600});
            const badgeOptions = {}
            const winBadge = new Badge(win, badgeOptions);
            setupWinBadge(win, winBadge);
        }
        function setupWinBadge(win, winBadge) {
            win.on('page-title-updated', (event, title) => {
                // consider getCounterValue as a method that gets
                // the number of notifications from the title, eg: (2) My App.
                const counter = getCounterValue(title);
                winBadge.update(counter);
            });
        }

## API

**Badge options**

| Option Name     | Default Value     | Description                                     |
| --------------- | ----------------- | ----------------------------------------------- |
| `fontColor `    | 'white'           | Font color                                      |
| `font `         | '24px arial'      | Font style                                      |
| `color `        | 'red'             | The color of badge                              |
| `fit`           | true              | Be sure that your number will be fit into badge |
| `decimals `     | 0                 | Numbers after dot (For float numbers)           |
| `radius`        | 8                 | The radius of badge                             |
| `borderColor`   | rgba(0,0,0, 0.16) | The border color                                |
| `borderWidth`   | 1                 | The border width                                |
| `shadowColor`   | rgba(0,0,0, 0.16) | The shadow color                                |
| `shadowBlur`    | 1                 | The shadow blur amount                          |
| `shadowOffsetX` | 0                 | The shadow X offset                             |
| `shadowOffsetY` | 1                 | The shadow Y offset                             |

## License

[MIT](LICENSE)
