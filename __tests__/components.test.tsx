import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../src/components/button';
import { AddComponents } from '../src/components/addComponents';

describe('Component Snapshot Tests', () => {
  it('renders Button correctly', () => {
    const tree = renderer
      .create(
        <Button label="Test Button" onPress={() => {}}>
          Test
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders AddComponents correctly', () => {
    const tree = renderer
      .create(
        <AddComponents
          product="Test Product"
          price="R$ 100,00"
          description="Description Line 1\nLine 2"
          shop="Store X"
          onPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
