import { createContext, useContext, useReducer } from "react";

// Creating a context
const VisibilityContext = createContext();

const initialState = {
  isVisible: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "makeVisible":
      return {
        isVisible: true,
      };
    case "makeInVisible":
      return {
        isVisible: false,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// Below is the one responsible to provide state to all the components in the application or to those which come under it.
function VisibilityProvider({ children }) {
  // Adding 'reducers' to our application so that other can modify this state.
  // In this case, we have defined all the 'dispatch' function in the above function.
  // 'dispatch' is basically used to ask the context API to make a state change.
  const [state, dispatch] = useReducer(reducer, initialState); // Updated: Renamed 'isVisible' to 'state' to correctly access state object

  return (
    // Here, 'value' is what we are passing down the tree.
    <VisibilityContext.Provider
      value={{ isVisible: state.isVisible, dispatch }}
    >
      {children}
    </VisibilityContext.Provider>
  );
}

// 'useVisibility' can be used by the components across your app to access the state provided by the context Provider in this case 'VisibilityProvider'.

function useVisibility() {
  const context = useContext(VisibilityContext);

  if (!context) {
    throw new Error("useVisibility must be used within a <VisibilityProvider>"); // Updated: Improved error message
  }

  return context;
}

// 'VisibilityProvider' is used to provide state across the application.
// 'useVisibility' is used to access that state. 'useVisibility' also provides 'dispatch' function which will make it possible to update any state accross your application
export { VisibilityProvider, useVisibility };
