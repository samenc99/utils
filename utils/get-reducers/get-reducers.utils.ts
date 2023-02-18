import { PayloadAction } from '@reduxjs/toolkit';

type Actions<T, K extends keyof T> = {
  [P in K]: (state: T[P]) => any;
};

type AllActions<T> = Required<Actions<T, keyof T>> & {
  setState: (state: Partial<T>) => any;
};

export function getReducers<T>(initialState: T) {
  const reducers: any = {};

  (Object.keys(initialState) as (keyof T)[]).forEach((key) => {
    reducers[key] = (state: T, action: PayloadAction<T[keyof T]>) => {
      state[key] = action.payload;
    };
  });

  reducers.setState = (state: T, action: PayloadAction<Partial<T>>) => {
    (Object.keys(action.payload) as (keyof T)[]).forEach((key) => {
      if (
        initialState[key] !== undefined &&
        action.payload[key] === undefined
      ) {
        return;
      }

      state[key] = action.payload[key]!;
    });
  };

  return reducers as AllActions<T>;
}
