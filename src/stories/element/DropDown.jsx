
import React, { PropTypes } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Immutable from 'immutable';
import DropDown from '../../element/DropDown';

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

storiesOf('Element.DropDown', module).add('Basic', () => (
  <DropDown
    name="sex"
    placeholder="Select your sex"
    onChange={action('onChange')}
    options={Immutable.OrderedMap([
      ['female', 'Female'],
      ['male', 'Male'],
    ])}
  />
));

storiesOf('Element.DropDown', module).add('Basic with value', () => (
  <DropDown
    name="sex"
    value="male"
    placeholder="Select your sex"
    onChange={action('onChange')}
    options={Immutable.OrderedMap([
      ['female', 'Female'],
      ['male', 'Male'],
    ])}
  />
));

storiesOf('Element.DropDown', module).add('Basic with lots of items', () => {
  const years = [];

  for (let i = 1900; i < 2016; i += 1) {
    years.push([i, i]);
  }

  return (
    <DropDown
      name="year"
      placeholder="Select your year of birth"
      onChange={action('onChange')}
      options={Immutable.OrderedMap(years)}
    />
  );
});

storiesOf('Element.DropDown', module).add('Custom option renderer', () => (
  <DropDown
    name="font"
    value="Helvetica"
    placeholder="Select a font"
    onChange={action('onChange')}
    optionsComponent={FontComponent}
    options={Immutable.OrderedMap([
      ['Arial', 'Arial'],
      ['Helvetica', 'Helvetica'],
      ['Source Sans Pro', 'Source Sans Pro'],
      ['Verdana', 'Verdana'],
    ])}
  />
));