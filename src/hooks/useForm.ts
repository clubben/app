import { Dispatch, useState } from 'react';

export type Form<T> = {
  [Key in keyof T]: {
    value: T[Key];
    error?: string;
    isValid: () => boolean;
    /**
     * Triggers validation of the current state
     */
    trigger: () => void;
  };
};

type Input<T> = {
  [key in keyof T]: {
    value: T[key];
    validate?: (value: T[key]) =>
      | {
          isValid: boolean;
          message: string;
        }
      | undefined;
  };
};

type State<T extends Input<any>> = {
  [key in keyof T]: {
    value: T[key]['value'];
    error?: string;
  };
};

type Values<T> = {
  [key in keyof T]: T[key];
};

export type SetFormAction<T> = (prevState: T) => T;

export function useForm<T extends object>(form: Input<T>) {
  const initialState = Object.keys(form).reduce(function (result, key) {
    result[key] = { value: form[key]['value'] };
    return result;
  }, {} as State<typeof form>);

  // Required by the isValid() function since react state is async. This returns the 'real' current state.
  let syncStateCopy = initialState;
  const [state, setState] = useState(initialState);

  /**
   *  Convenience method that allows updating the form state while ignoring the error state.
   */
  function setForm(value: (prev: Values<T>) => Values<T>) {
    setState(prev => {
      const input = Object.keys(prev).reduce(function (result, key) {
        result[key] = prev[key]['value'];
        return result;
      }, {} as Values<T>);

      const nextState = value(input);

      const nextFilledState = Object.keys(nextState).reduce(function (
        result,
        key
      ) {
        result[key] = {
          ...prev[key],
          value: nextState[key],
        };
        return result;
      },
      {} as State<Input<T>>);

      syncStateCopy = nextFilledState;
      return nextFilledState;
    });
  }

  return [
    Object.keys(state).reduce(function (result, key) {
      const element = {
        value: state[key]['value'],
        error: state[key]['error'],
        isValid: () => syncStateCopy[key]['error'] === undefined,
        trigger: () =>
          setState(prev => {
            const element = {
              ...prev[key],
            };

            if ('validate' in form[key]) {
              const res = form[key].validate(prev[key].value);
              if (res && !res.isValid) {
                element['error'] = res.message;
              } else {
                element['error'] = undefined;
              }
            }

            const nextState = {
              ...prev,
              [key]: element,
            };

            syncStateCopy = nextState;
            return nextState;
          }),
      };

      result[key] = element;
      return result;
    }, {} as Form<T>),
    setForm as Dispatch<SetFormAction<T>>,
  ] as const;
}
