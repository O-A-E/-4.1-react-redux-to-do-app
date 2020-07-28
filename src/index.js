import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { v4 as uuidv4 } from 'uuid';
import { createStore } from 'redux';

/**
 * Redux Actions
 * 
 * Actions are "labels" for what type of functionality/manipulation or state we are setting up that we will be performing/allowing on our global state data
 * Usually used with a switch statement for mulitple manipulations
 * The action "names" ('type' property values), by convention, are uppercase as they are representing a "constant" value.
 */ 

// These consts are just a name to represent that functionality with regards to the state. These are the Redux actions! 
 const addNewToDo = toDoContent => {
  return {
    type: 'ADD_NEW_TO_DO', // when we run this later, the case needs to match! For Redux, action values are in all uppercase! This is our action "label"
    value: toDoContent // Don't want this to be hard-coded; We can also transport necessary info that the Reducer might need
  }
}

const removeNewToDo = toDoId => {
  return {
    type: 'REMOVE_TO_DO', // Redux actions are all uppercase; our action "label"
    value: toDoId // For removal, we need a unique identifier so that we can target exactly what needs to be removed
  }
}

/**
 * Redux Reducer:
 *    A reducer will carry out the manipulation/mutation on the state data. It should expect an 
 *   "action" to be passed in with any necessary target data to perform its duty.
 */

 const toDoReducer = ( state = [], action ) => { // state = maniupluated/mutated data, action = whatever will be happening; this only about how we are updating the state based on an action; the default state is an empty array in this case
    switch ( action.type )
    {
      // What happens if we are adding a new to-do:
      case 'ADD_NEW_TO_DO':
        // lines 39-48 is only concerned with the data manipulation NOT how this is being called; 
        // set up new task
        const newTask = {
          uniqueId: uuidv4(), // Ensure a unique ID
          value: action.value // Read the current, passed-in "new todo" value

        };
        // Add this task to the state.
        state.push ( newTask );
        // Return the updated state value.
        return state;

        // What happens if we are removing an exisiting to-do:
      case 'REMOVE_TO_DO':
        // Returns a filtered version of the array, leaving only the items that DIDN'T match the "id" parameter!
        const updatedToDoList = state.filter ( toDo => toDo.uniqueId !== action.value ); // We'll have an array without the target
      return updatedToDoList; 
    }
 }
 /**
  * Redux Store:
  *   Store is the full representation of our state. it is a complex object that keeps track of the state data, and will help us operate on it using defined reducers/actions!
  *   "Store" is our data store; "createStore (toDoReducer) return an dobject that will return built in functionality that will help us 
  */

 let store = createStore ( toDoReducer );

 // Attempt to output, see if we're getting an error!
 store.subscribe ( () => console.log (store.getState () ) ); // Oututs each time a change occurs (subscribe watches for changes.)


 /**
  * Redux Dispatch:
  *   Dispatch is used for us to send commands for mutation/manipulation/reads from our store/state data.
  */

  store.dispatch ( addNewToDo( "Buy milk!" ) );
  store.dispatch ( addNewToDo( "Practice React!" ) );
  store.dispatch ( addNewToDo( "Practice Redux!" ) );




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

