
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import NumberWithUnit from '../../element/NumberWithUnit';

storiesOf('Element.NumberWithUnit', module).add('Empty', () => (
  <NumberWithUnit
    value=""
    name="test-input"
    onChange={action('onChange')}
  />
));

storiesOf('Element.NumberWithUnit', module).add('With value', () => (
  <NumberWithUnit
    value="100%"
    name="test-input"
    onChange={action('onChange')}
  />
));
