
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Text from '../../element/Text';

storiesOf('Element.Text', module).add('Empty', () => (
  <Text value="" name="test-input" onChange={action('onChange')} />
));

storiesOf('Element.Text', module).add('Empty with placeholder', () => (
  <Text
    value=""
    name="test-input"
    onChange={action('onChange')}
    placeholder="Name"
  />
));
