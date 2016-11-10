
import React from 'react';
import { fromJS } from 'immutable';
import { storiesOf, action } from '@kadira/storybook';
import elementWrapper from '../ElementWrapper';
import ColorPalette from '../../element/ColorPalette';

const WrapperColorPicker = elementWrapper(ColorPalette);

storiesOf('Element.ColorPalette', module).add('With key => value palette', () => (
  <WrapperColorPicker
    name="value"
    value="secondary"
    onChange={action('onChange')}
    palette={fromJS([
      {
        name: 'Primary',
        value: 'primary',
        color: ['#ffffff', '#f44336'],
      },
      {
        name: 'Secondary',
        value: 'secondary',
        color: ['#9c27b0', '#673ab7'],
      },
      {
        name: 'Tertiary',
        value: 'tertiary',
        color: ['#3f51b5', '#2196f3'],
      },
      {
        name: 'Quaternary',
        value: 'quaternary',
        color: ['#03a9f4', '#00bcd4'],
      },
    ])}
  />
));
