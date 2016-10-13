
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Immutable, { Map as map, OrderedMap as orderedMap } from 'immutable';
import Form from '../Form';
import Group from '../Group';
import Control from '../Control';
import ColorPicker from '../element/ColorPicker';
import Text from '../element/Text';
import SliderWithText from '../element/SliderWithText';
import Select from '../element/Select';

require('!style!css!postcss!sass!../../sass/style.scss');

const values = map({
  name: 'Ian',
  age: 32,
  sex: '',
  background: '#01a8fc',
  foreground: '#fefefe',
  address: 'Kent, UK',
  padding: '10px',
  columnSpacing: 'none',
  width: 'fixed',
});

storiesOf('Form', module).add('Simple form', () => (
  <div
    style={{
      margin: '1.5rem auto',
      maxWidth: '300px',
    }}
  >
    <Form
      name="test-form"
      title="User details"
      onChange={action('Form.onChange')}
      values={values}
    >
      {form => (
        <div>
          <Group title="Profile">
            <Control
              label="Name"
              isEmpty={Text.isEmpty(form.values.get('name'))}
            >
              <Text
                name="name"
                value={form.values.get('name')}
                onChange={form.onChange}
              />
            </Control>

            <Control
              label="Age"
              isEmpty={Text.isEmpty(form.values.get('age'))}
            >
              <SliderWithText
                name="age"
                value={form.values.get('age')}
                onChange={form.onChange}
                fitToContent
              />
            </Control>

            <Control
              label="Sex"
              isEmpty={Text.isEmpty(form.values.get('sex'))}
            >
              <Select
                name="sex"
                value={form.values.get('sex')}
                onChange={form.onChange}
                allowEmpty
                options={orderedMap([
                  ['female', 'Female'],
                  ['male', 'Male'],
                ])}
              />
            </Control>
          </Group>

          <Group title="Address">
            <Control
              label="Address"
              isEmpty={Text.isEmpty(form.values.get('address'))}
            >
              <Text
                name="address"
                value={form.values.get('address')}
                onChange={form.onChange}
              />
            </Control>

            <Control
              compact
              label="Background"
              isEmpty={ColorPicker.isEmpty(form.values.get('background'))}
            >
              <ColorPicker
                name="background"
                value={form.values.get('background')}
                onChange={form.onChange}
                position="top"
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
            </Control>
          </Group>
        </div>
      )}
    </Form>
  </div>
));

storiesOf('Form', module).add('Simple compact form', () => (
  <div
    style={{
      margin: '1.5rem auto',
      maxWidth: '300px',
    }}
  >
    <Form
      name="test-form"
      title="User details"
      onChange={action('Form.onChange')}
      values={values}
    >
      {form => (
        <div>
          <Group title="Profile">
            <Control
              compact
              label="Background"
              isEmpty={ColorPicker.isEmpty(form.values.get('background'))}
            >
              <div className="react-forms-color-picker-stack">

                <ColorPicker
                  name="foreground"
                  value={form.values.get('foreground')}
                  onChange={form.onChange}
                  position="bottom"
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

                <ColorPicker
                  name="background"
                  value={form.values.get('background')}
                  onChange={form.onChange}
                  position="bottom"
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

              </div>
            </Control>

            <Control
              compact
              label="Padding"
              isEmpty={Text.isEmpty(form.values.get('padding'))}
            >
              <SliderWithText
                compact
                name="padding"
                value={form.values.get('padding')}
                onChange={form.onChange}
                fitToContent
              />
            </Control>

            <Control
              compact
              label="Column spacing"
              isEmpty={Text.isEmpty(form.values.get('columnSpacing'))}
            >
              <Select
                name="columnSpacing"
                value={form.values.get('columnSpacing')}
                onChange={form.onChange}
                options={orderedMap([
                  ['none', 'None'],
                  ['between', 'In-between'],
                  ['surround', 'Surround'],
                  ['outside', 'Outside'],
                ])}
              />
            </Control>

            <Control
              compact
              label="Width"
              isEmpty={Text.isEmpty(form.values.get('width'))}
            >
              <Select
                name="width"
                value={form.values.get('width')}
                onChange={form.onChange}
                options={orderedMap([
                  ['fixed', 'Fixed'],
                  ['full', 'Full (100%)'],
                ])}
              />
            </Control>
          </Group>
        </div>
      )}
    </Form>
  </div>
));
