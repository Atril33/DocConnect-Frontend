import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import Home from '../../routes/Home';

describe('Home component', () => {
  const queryClient = new QueryClient();

  it('should render correctly when the user is signed in', () => {
    const component = renderer.create(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Home userSignedIn />
          </Provider>
        </QueryClientProvider>
      </MemoryRouter>,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render correctly when the user is not signed in', () => {
    const component = renderer.create(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Home userSignedIn={false} />
          </Provider>
        </QueryClientProvider>
      </MemoryRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
