'use strict';

const {
  CircleShape,
  Clock,
  Color,
  ConvexShape,
  Keyboard,
  Mouse,
  RectangleShape,
  RenderWindow,
  VideoMode,
} = require('../lib/sfml');

const mode = VideoMode.getFullscreenModes()[3];
const window = new RenderWindow(mode, 'hello', 5);
const circle = new CircleShape(100, 1);
const convex = new ConvexShape(3);
const rectangle = new RectangleShape({ x: 20, y: 20 });
circle.setOutlineThickness(1.6);
convex.setPoint(0, { x: 20, y: 30 });
convex.setPoint(1, { y: 30, x: 40 });
convex.setPoint(2, { x: 0, y: 0 });

let circleColor = 0;
const red = new Color(255, 0, 0, 255);
const clock = new Clock();
function frame() {
  if (!window.isOpen()) return;
  const delta = clock.getElapsedTime();
  console.log('dt:', delta);
  clock.restart();

  let event;
  while ((event = window.pollEvent())) {
    if (event.type === 'Closed') {
      window.close();
    } else if (event.type === 'KeyPressed') {
      // if (event.key.codeStr === 'Escape') {
      //   window.close();
      // }
    }
  }

  if (Keyboard.isKeyPressed('Escape')) {
    window.close();
  }

  if (Keyboard.isKeyPressed('S')) {
    Keyboard.setVirtualKeyboardVisible(true);
  } else {
    Keyboard.setVirtualKeyboardVisible(false);
  }

  window.clear(red);
  circleColor = (circleColor + 1) % 256;
  let color = (circleColor << 16) + 0xff;  // eslint-disable-line
  circle.setFillColor(color);
  color = (circleColor << 8) + 0xff;  // eslint-disable-line
  circle.setOutlineColor(color);
  const pos = circle.getPosition();
  pos.x = (pos.x + 1) % 1000;
  pos.y = (pos.y + 1) % 1000;
  circle.setPosition(pos);
  circle.setPointCount(circle.getPointCount() % 100 + 1);

  circle.setRotation(circle.getRotation() % 360 + 1);

  const scale = circle.getScale();
  scale.x = (scale.x + 1) % 5;
  scale.y = (scale.y + 1) % 5;
  circle.setScale(scale);

  const mousePos = {
    desktop: Mouse.getPosition(),
    window: Mouse.getPosition(window),
  };
  console.log('Mouse:', mousePos);

  if (mousePos.window.x < 0) {
    mousePos.window.x = Math.abs(mousePos.window.x);
  }
  if (mousePos.window.x > mode.width) {
    mousePos.window.x = mode.width;
  }
  if (mousePos.window.y < 0) {
    mousePos.window.y = Math.abs(mousePos.window.y);
  }
  if (mousePos.window.y > mode.height) {
    mousePos.window.y = mode.height;
  }
  console.log(mousePos.window);
  Mouse.setPosition(mousePos.window, window);

  window.draw(circle);
  window.draw(rectangle);
  window.draw(convex);
  window.display();

  setTimeout(frame, 1000 / 30);
}

frame();
