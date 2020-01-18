const robot = require("robotjs");
const puppeteer = require('puppeteer');
const socket = require('socket.io-client')('https://madxkk-rc-server.glitch.me/slave');

robot.setMouseDelay(2);

const updateLastSelectedElement = (str) => {
  global.lastSelectedElement = str;
}

const global = {
  screensize: robot.getScreenSize(),
  movemouse: {
    x: 0,
    y: 0,
  },
};

(async () => {
  const browser = await puppeteer.launch({headless: false, args: ['--start-fullscreen', '--window-size=1920,1080']});
  const page = await browser.newPage();
  await page.setViewport({width:1920, height:1080});
  global.browser = browser;
  global.page = page;
})();

socket.on('connect', () => {
  console.log('Connected as slave');
});

socket.on('newslave', (event) => {
  console.log('newslave');
});

socket.on('update', (event) => {
  if (!event) return;
  console.log(event);
  if (event.type) {
    if (event.type === 'movemouse') {
      if (event.data.x && event.data.y) {
        if (global.movemouse.x !== 0 && global.movemouse.y !== 0) {
          const curr = robot.getMousePos();
          curr.x += (event.data.x - global.movemouse.x) / 4;
          curr.y += (event.data.y - global.movemouse.y) / 4;
          robot.moveMouse(curr.x, curr.y);
        } else {
          global.movemouse.x = event.data.x;
          global.movemouse.y = event.data.y;
        }
      }
    }
    if (event.type === 'movemouseover') {
      global.movemouse.x = 0;
      global.movemouse.y = 0;
    }
    if (event.type === 'openurl') {
      if (event.data.url) {
        global.page.goto(event.data.url);
        console.log(this);
        global.page.evaluateOnNewDocument((updateLastSelectedElement) => {
          document.addEventListener('click', (e) => {
            updateLastSelectedElement(e.target.nodeName);
          });
        });
      }
      if (global.lastSelectedElement === "INPUT") {
        socket.emit('keyboard');
        global.lastSelectedElement = "";
      }
    }
    if (event.type === 'lclick') {
      robot.mouseClick()
    }
    if (event.type === 'dclick') {
      robot.mouseClick('left', true);
    }
  }
});

socket.on('disconnect', () => {
  console.log('dc');
});
