
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import elementWrapper from '../ElementWrapper';
import SliderWithText from '../../element/SliderWithText';

const WrapperSliderWithText = elementWrapper(SliderWithText);

storiesOf('Element.SliderWithText', module).add('Basic with percent', () => (
  <WrapperSliderWithText
    value="100%"
    name="value"
    onChange={action('onChange')}
  />
));

storiesOf('Element.SliderWithText', module).add('Basic with number', () => (
  <WrapperSliderWithText
    compact
    min={0}
    max={25}
    value={15}
    name="value"
    onChange={action('onChange')}
    valueIsNumber
  />
));

storiesOf('Element.SliderWithText', module).add('With min, max and step', () => (
  <WrapperSliderWithText
    min={50}
    max={250}
    step={5}
    value="100%"
    name="value"
    onChange={action('onChange')}
  />
));

storiesOf('Element.SliderWithText', module).add('Compact when inactive', () => (
  <WrapperSliderWithText
    compact
    min={50}
    max={250}
    step={5}
    value="100%"
    name="value"
    onChange={action('onChange')}
  />
));
