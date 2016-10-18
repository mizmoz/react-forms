
import React from 'react';
import Immutable, { List as list } from 'immutable';
import { storiesOf, action } from '@kadira/storybook';
import elementWrapper from '../ElementWrapper';
import ColorPicker from '../../component/color-picker/ColorPicker';
import Buttons from '../../component/color-picker/Buttons';

const WrapperColorPicker = elementWrapper(ColorPicker);

storiesOf('Component.ColorPicker', module).add('Basic', () => (
  <WrapperColorPicker
    value=""
    onChange={action('onChange')}
  />
));

storiesOf('Component.ColorPicker', module).add('Basic with buttons', () => (
  <WrapperColorPicker
    value="#01a8fc"
    onChange={action('onChange')}
  >
    <Buttons>
      <button>Use</button>
      <button>Cancel</button>
    </Buttons>
  </WrapperColorPicker>
));

storiesOf('Component.ColorPicker', module).add('Basic without Alpha', () => (
  <WrapperColorPicker
    value="#01a8fc"
    onChange={action('onChange')}
    disableAlpha
  />
));

storiesOf('Component.ColorPicker', module).add('With palette', () => (
  <WrapperColorPicker
    value="#03a9f4"
    onChange={action('onChange')}
    palette={list([
      '#f44336',
      '#e81b61',
      '#9c27b0',
      '#673ab7',
      '#3f51b5',
      '#2196f3',
      '#03a9f4',
      '#00bcd4',
    ])}
  />
));

storiesOf('Component.ColorPicker', module).add('With key => value palette', () => (
  <WrapperColorPicker
    value="#01a8fc"
    onChange={action('onChange')}
    palette={Immutable.fromJS([
      {
        name: 'Primary foreground',
        value: 'primaryForeground',
        color: '#ffffff',
      },
      {
        name: 'Primary background',
        value: 'primaryBackground',
        color: '#f44336',
      },
      {
        name: 'Secondary foreground',
        value: 'secondaryForeground',
        color: '#9c27b0',
      },
      {
        name: 'Secondary background',
        value: 'secondaryBackground',
        color: '#673ab7',
      },
      {
        name: 'Tertiary foreground',
        value: 'tertiaryForeground',
        color: '#3f51b5',
      },
      {
        name: 'Tertiary background',
        value: 'tertiaryBackground',
        color: '#2196f3',
      },
      {
        name: 'Quaternary foreground',
        value: 'quaternaryForeground',
        color: '#03a9f4',
      },
      {
        name: 'Quaternary background',
        value: 'quaternaryBackground',
        color: '#00bcd4',
      },
    ])}
  />
));
