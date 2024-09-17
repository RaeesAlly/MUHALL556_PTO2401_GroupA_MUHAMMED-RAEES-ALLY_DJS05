
// store function
function createStore(reducer) {
  let state;
  let listeners = [];

  // Method to get the current state
  const getState = () => state;

  // Method to dispatch actions
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener()); // Notify subscribers
  };

  // Method to subscribe to state changes
  const subscribe = (listener) => {
    listeners.push(listener);

    // Return unsubscribe function
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // Initialise the state with a dummy action.
  dispatch({ type: '__INIT__' });

  return { getState, dispatch, subscribe };
}

// Reducer function to manage state changes based on action types
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'ADD':
      return { count: state.count + 1 };
    case 'SUBTRACT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

// Create the store with the counter reducer
const store = createStore(counterReducer);

// Subscribe to store changes and log the current state to the console
store.subscribe(() => {
  console.log("Current State:", store.getState());
});

// Event listeners to interact with the store
document.getElementById('add').addEventListener('click', () => {
  store.dispatch({ type: 'ADD' });
});

document.getElementById('subtract').addEventListener('click', () => {
  store.dispatch({ type: 'SUBTRACT' });
});

document.getElementById('reset').addEventListener('click', () => {
  store.dispatch({ type: 'RESET' });
});

// Initial state logging
console.log("Initial State:", store.getState());
