// 12/02/2025 lo traigo de copilot pero no hago la conexion con la app

import React from 'react';
import { HotKeys } from 'react-hotkeys';

const keyMap = {
  SHOW_ALERT: 'ctrl+a', // Example shortcut
  NAVIGATE_HOME: 'ctrl+h'
};

const handlers = {
  SHOW_ALERT: () => alert('Shortcut triggered!'),
  NAVIGATE_HOME: () => console.log('Navigate home shortcut triggered!')
};

const App = () => {
  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <div>
        <h1>React App with Keyboard Shortcuts</h1>
        <p>Try pressing Ctrl+A or Ctrl+H</p>
      </div>
    </HotKeys>
  );
};

export default App;
