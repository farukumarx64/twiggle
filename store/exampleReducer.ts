// store/exampleReducer.ts
const initialState = {
  // initial state here
};

const exampleReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // handle actions here
    default:
      return state;
  }
};

export default exampleReducer;
