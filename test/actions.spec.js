import { removeTodo, cancelRemovingTodo, call, fetchTodos } from '../src/actions';

describe('actions', () => {
  describe('sync actions', () => {
    it('removeTodo', () => {
      const state = { a: 1, b: 2 };
      expect(removeTodo(10)(state)).toEqual({ a: 1, b: 2, removingTodoId: 10 });
    });

    it('cancelRemovingTodo', () => {
      const state = { a: 1, b: 2 };
      expect(cancelRemovingTodo()(state)).toEqual({ a: 1, b: 2, removingTodoId: null });
    });
  });

  describe('async actions', () => {
    describe('call', () => {
      it('works properly', async () => {
        const dispatch = jest.fn();
        const api = {
          '/abc': {
            get: jest.fn()
          }
        };
        api['/abc'].get.mockReturnValue(Promise.resolve(10));
        const returnValue = await call('GET', '/abc', { a: 1 }, { b: 2 })()(dispatch, null, api);
        expect(returnValue).toEqual(10);
        expect(dispatch.mock.calls[0][0]()).toHaveProperty('isFetching', true);
        expect(dispatch.mock.calls[1][0]()).toHaveProperty('isFetching', false);
        expect(api['/abc'].get).toBeCalledWith({ a: 1 }, { b: 2 });
      });

      it('throws exception', async () => {
        const dispatch = jest.fn();
        const api = {
          '/abc': {
            get: jest.fn()
          }
        };
        api['/abc'].get.mockReturnValue(Promise.reject(new Error('oops')));
        await call('GET', '/abc', { a: 1 }, { b: 2 })()(dispatch, null, api).catch(err =>
          expect(err.message).toEqual('oops')
        );
        expect(dispatch.mock.calls[0][0]()).toHaveProperty('isFetching', true);
        expect(dispatch.mock.calls[1][0]()).toHaveProperty('error', 'oops');
        expect(dispatch.mock.calls[2][0]()).toHaveProperty('isFetching', false);
        expect(api['/abc'].get).toBeCalledWith({ a: 1 }, { b: 2 });
      });
    });

    describe('fetchTodos', () => {
      it('works properly', async () => {
        const todos = [
          {
            id: 1,
            message: 'shopping',
            checked: false
          },
          {
            id: 2,
            message: 'carwash',
            checked: true
          }
        ];
        const dispatch = jest.fn();
        dispatch.mockReturnValueOnce();
        dispatch.mockReturnValueOnce(Promise.resolve(todos));
        await fetchTodos()()(dispatch);
        expect(dispatch.mock.calls[0][0]()).toHaveProperty('removingTodoId', null);
        expect(dispatch.mock.calls[2][0]()).toHaveProperty('todos', todos);
      });
    });
  });
});
