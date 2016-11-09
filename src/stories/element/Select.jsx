
import React, { PropTypes } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { OrderedMap as orderedMap } from 'immutable';
import Select from '../../element/Select';

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
      ['female', 'Female'],
      ['male', 'Male'],
    ])}
  />
));

storiesOf('Element.Select', module).add('Basic with value', () => (
  <Select
    name="sex"
    value="male"
    placeholder="Select your sex"
    onChange={action('onChange')}
    options={orderedMap([
      ['female', 'Female'],
      ['male', 'Male'],
    ])}
  />
));

storiesOf('Element.Select', module).add('Basic with lots of items', () => {
  const years = [];

  for (let i = 1900; i < 2016; i += 1) {
    years.push([i, i]);
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

storiesOf('Element.Select', module).add('Custom option renderer', () => (
  <Select
    name="font"
    value="Helvetica"
    placeholder="Select a font"
    onChange={action('onChange')}
    optionsComponent={FontComponent}
    options={orderedMap([
      ['Arial', 'Arial'],
      ['Helvetica', 'Helvetica'],
      ['Source Sans Pro', 'Source Sans Pro'],
      ['Verdana', 'Verdana'],
    ])}
  />
));