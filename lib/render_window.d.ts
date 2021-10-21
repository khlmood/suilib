import * as VideoMode from './video_mode';
import * as Drawable from './drawable/base';
import * as Event from './poll_event';

declare class RenderWindow {
  constructor(videoMode?: VideoMode, title?: string, style?: RenderWindow.Style);

  clear(color: number = 0): void;
  close(): void;
  draw(content: Drawable): void;
  display(): void;
  isOpen(): boolean;

  pollEvent(): Event;

  setVisible(visible: boolean): void;
  setVerticalSyncEnabled(enabled: boolean): void;
  setMouseCursorVisible(visible: boolean): void;
  setMouseCursorGrabbed(grabbed: boolean): void;
  setKeyRepeatEnabled(enabled: boolean): void;
  setFramerateLimit(limit: number): void;
  setActive(active?: boolean = true): void;
}

declare namespace RenderWindow {
  enum Style {
    None = 0,
    Titlebar = 1 << 0,
    Resize = 1 << 1,
    Close = 1 << 2,
    Fullscreen = 1 << 3,
    Default = Titlebar | Resize | Close,
  }
}

export = RenderWindow;
