
export default class KeyboardEvents {

  constructor(d = document) {
    this.document = d;
    this.events = [];
    this.check = () => true;
  }

  /**
   * Key codes
   *
   */
  keyCode = {
    arrowLeft: 37,
    arrowRight: 39,
    arrowUp: 38,
    arrowDown: 40,
    escape: 27,
    enter: 13,
  };

  /**
   * Add a matcher and callback
   *
   * @param matcher
   * @param callback
   * @param stopAfterEvent Don't call anymore events if this is matched
   */
  add = (matcher, callback, stopAfterEvent = true) => {
    this.events.push({
      matcher: matcher,
      callback: callback,
      stopAfterEvent: stopAfterEvent,
    });

    return this;
  };

  /**
   * Add CTRL or CMD + KEY combo
   *
   * @param key
   * @param callback
   * @param stopAfterEvent Don't call anymore events if this is matched
   * @returns {KeyboardEvents}
   */
  addCtrlKey = (key, callback, stopAfterEvent = true) => {
    // make sure we have the character code
    const charCode = (typeof key === 'string' ? key.charCodeAt(0) : key);

    return this.add(
      event => ((event.ctrlKey || event.metaKey) && !event.shiftKey && event.which === charCode),
      callback,
      stopAfterEvent
    );
  };

  /**
   * Add CTRL or CMD + SHIFT + KEY
   *
   * @param key
   * @param callback
   * @param stopAfterEvent
   */
  addCtrlShiftKey = (key, callback, stopAfterEvent = true) => {
    // make sure we have the character code
    const charCode = (typeof key === 'string' ? key.charCodeAt(0) : key);

    return this.add(
      event => ((event.ctrlKey || event.metaKey) && event.shiftKey && event.which === charCode),
      callback,
      stopAfterEvent
    );
  };

  /**
   * Add enter key watching
   *
   * @param callback
   * @param stopAfterEvent
   * @returns {KeyboardEvents}
   */
  addEnterKey = (callback, stopAfterEvent = true) => this.add(
    event => event.keyCode === this.keyCode.enter, callback, stopAfterEvent
  );

  /**
   * Add escape key watching
   *
   * @param callback
   * @param stopAfterEvent
   * @returns {KeyboardEvents}
   */
  addEscapeKey = (callback, stopAfterEvent = true) => this.add(
    event => event.keyCode === this.keyCode.escape, callback, stopAfterEvent
  );

  /**
   * Add left arrow key watching
   *
   * @param callback
   * @param stopAfterEvent
   * @returns {KeyboardEvents}
   */
  addArrowLeft = (callback, stopAfterEvent = true) => this.add(
    event => event.keyCode === this.keyCode.arrowLeft, callback, stopAfterEvent
  );

  /**
   * Add right arrow key watching
   *
   * @param callback
   * @param stopAfterEvent
   * @returns {KeyboardEvents}
   */
  addArrowRight = (callback, stopAfterEvent = true) => this.add(
    event => event.keyCode === this.keyCode.arrowRight, callback, stopAfterEvent
  );

  /**
   * Add up arrow key watching
   *
   * @param callback
   * @param stopAfterEvent
   * @returns {KeyboardEvents}
   */
  addArrowUp = (callback, stopAfterEvent = true) => this.add(
    event => event.keyCode === this.keyCode.arrowUp, callback, stopAfterEvent
  );

  /**
   * Add down arrow key watching
   *
   * @param callback
   * @param stopAfterEvent
   * @returns {KeyboardEvents}
   */
  addArrowDown = (callback, stopAfterEvent = true) => this.add(
    event => event.keyCode === this.keyCode.arrowDown, callback, stopAfterEvent
  );

  /**
   * Only fire the callback if the event target is the body
   *
   * @param callback
   * @returns {Function}
   */
  eventTargetIsBody = callback => (event) => {
    if (event.target === document.body) {
      callback(event);
    }
  };

  /**
   * Only apply the keys when the callback returns true
   *
   * @param callback
   */
  when = (callback) => {
    this.check = callback;
  };

  /**
   * Handle the key press event
   *
   * @param event
   */
  handle = (event) => {
    if (!this.check(event)) {
      return;
    }

    for (let i = 0; i < this.events.length; i += 1) {
      const item = this.events[i];

      if (item.matcher(event)) {
        item.callback(event);

        if (item.stopAfterEvent) {
          break;
        }
      }
    }
  }

  /**
   * Get the events, useful for the Component.addEvent(...eventKeys.get())
   * @returns {*[]}
   */
  get = () => [
    this.document,
    'keydown',
    this.handle,
  ];
}
