
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import elementWrapper from '../ElementWrapper';
import TextArea from '../../element/TextArea';

const WrapperTextArea = elementWrapper(TextArea);

storiesOf('Element.TextArea', module).add('Empty', () => (
  <WrapperTextArea value="" name="test-input" onChange={action('onChange')} />
));
