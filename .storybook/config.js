import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/stories/index.jsx');
}

configure(loadStories, module);
