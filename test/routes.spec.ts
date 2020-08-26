import { routes } from '../src/routes';

describe('routes', () => {
  it('defines /gifs route', () => {
    const definedRoutes = routes.stack.filter(stack => stack.route).map(stack => stack.route.path);

    expect(definedRoutes).toContain('/gifs');
  });
});
