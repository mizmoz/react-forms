
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Switch from '../../element/Switch';
import elementWrapper from '../ElementWrapper';

const WrappedSwitch = elementWrapper(Switch);

storiesOf('Element.Switch', module).add('Empty with default set to off', () => (
  <WrappedSwitch
    value=""
    name="value"
    onChange={action('onChange')}
  />
));

storiesOf('Element.Switch', module).add('Switch is on', () => (
  <WrappedSwitch
    value="1"
    name="value"
    onChange={action('onChange')}
  />
));
