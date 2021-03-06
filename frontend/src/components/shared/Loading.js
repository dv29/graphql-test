import React from 'react';
import { branch, renderComponent } from 'recompose';

const Loading = () => (
  <div>
    Loading...
  </div>
);

export const withLoadingComponent = branch(
  props => props.data.loading,
  renderComponent(Loading)
);
