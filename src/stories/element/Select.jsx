
import React, { PropTypes } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { OrderedMap as orderedMap, List as list } from 'immutable';
import Select from '../../element/Select';

import elementWrapper from '../ElementWrapper';

const WrappedSelect = elementWrapper(Select);

const FontComponent = props => (
  <button
    value={props.value}
    onClick={props.onClick}
    style={{
      fontFamily: props.value,
    }}
  >{props.name}</button>
);

FontComponent.propTypes = {
  name: PropTypes.name,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

storiesOf('Element.Select', module).add('Basic', () => (
  <Select
    name="sex"
    placeholder="Select your sex"
    onChange={action('onChange')}
    options={orderedMap([
      ['Female', 'female'],
      ['Male', 'male'],
    ])}
  />
));

storiesOf('Element.Select', module).add('Basic with default value', () => (
  <Select
    name="sex"
    value="male"
    placeholder="Select your sex"
    onChange={action('onChange')}
    options={orderedMap([
      ['Female', 'female'],
      ['Male', 'male'],
    ])}
  />
));

storiesOf('Element.Select', module).add('Basic with lots of values only', () => {
  const years = [];

  for (let i = 1900; i < 2016; i += 1) {
    years.push([i]);
  }

  return (
    <Select
      name="year"
      placeholder="Select your year of birth"
      onChange={action('onChange')}
      options={orderedMap(years)}
      valueIsNumber
    />
  );
});

storiesOf('Element.Select', module).add('Subcategories', () => {
  const categories = orderedMap([
    [
      'Dark Colours', orderedMap([
        ['Black'],
        ['Navy Blue'],
      ]),
    ],
    [
      'Light Colours', orderedMap([
        ['White'],
        ['Yellow'],
      ]),
    ],
  ]);

  return (
    <WrappedSelect
      name="colour"
      placeholder="Select colour"
      onChange={action('onChange')}
      options={categories}
    />
  );
});

storiesOf('Element.Select', module).add('Custom option renderer', () => (
  <Select
    name="font"
    placeholder="Select a font"
    onChange={action('onChange')}
    optionsComponent={FontComponent}
    options={orderedMap([
      ['Arial'],
      ['Helvetica'],
      ['Source Sans Pro'],
      ['Verdana'],
    ])}
  />
));
