export const loggerMiddleware = (store) => (next) => (action) => {
  console.log("TYPE", action);
  if (!action.type) {
    return next(action);
  }

  console.log("payload", action.payload);
  console.log("currentState", store.getState());

  next(action);

  console.log("next state", store.getState());
};
