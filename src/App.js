import React from 'react';
import { v4 as uuidv4 } from 'uuid';

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

class App extends React.Component {
  constructor ( props )
  {
    super( props );

    this.state = {
      newToDo: "", // Keep track of our new to-do value.
      toDos: [] // Keep track of all the todos.
    };
  }

  // Add a new todo (see onSubmit in our form below.)
  addToDo = ( event ) =>
  {
    event.preventDefault(); // Stop the page from reloading.
    // console.log( "Test add todo!" ); // Test that we're submitting!

    // Set up new task.
    const newTask = {
      uniqueId: uuidv4(), // Ensure a unique ID.
      value: this.state.newToDo // Read current "new todo" value.
    };

    console.log( newTask ); // Check to see if newTask is generating okay.

    // Create a clone of our ToDos array, so we can make changes before updating state.
    const currentToDoList = [...this.state.toDos]; // "..." is the spread operator.
    currentToDoList.push( newTask ); // Add our new task to the clone array.

    // Use "setState" to update any state data (never re-assign directly!)
    this.setState( { // This is why we made a clone of the to-do list, and updated it before running setState again.
      toDos: currentToDoList, // Update todos list.
      newToDo: "" // Clear the "new to-do" field.
    } );
  }

  updateItem ( key, value )
  {
    // We never re-assign the contents of this.state.
    // this.state is ONLY USED FOR READING VALUES, NOT writing.
    // When we need to update anything in state, we need to use this.setState()
    // this.setState() triggers the render() method, so we can see updated state info in our presentation.
    this.setState( {[key]: value} );
  }

  removeToDo ( id )
  {
    // Create a clone of our ToDos array, so we can make changes before updating state.
    const currentToDoList = [...this.state.toDos]; // "..." is the spread operator.

    // Returns a filtered version of the array, leaving only the items that DIDN'T match the "id" parameter.
    const updatedToDoList = currentToDoList.filter( toDo => toDo.uniqueId !== id ); // We'll have an array without the target!

    // Since we can't update directly... use the setState method! This will trigger the render() method.
    this.setState( { toDos: updatedToDoList } );
  }

  render()
  {
    return (
      <>
      <h1> React/Redux To-Do Application</h1>
      <form onSubmit={this.addToDo}>
      <label htmlFor="newToDo">
        Enter a new "To-Do":
        <input
          type="text"
          name="newToDo"
          id="newToDo"
          required
          value={this.state.newToDo}
          onChange={event => this.updateItem( 'newToDo', event.target.value )} />
      </label>
      <input type="submit" value="Add New To-Do" />
    </form>
    <h2>Current To-Dos:</h2>
        <ul>
          {this.state.toDos.map( toDo => ( // We can use .map() to "loop" through our array contents. Great for outputting something like these ToDos.
            <li key={toDo.uniqueId} onClick={() => {this.removeToDo( toDo.uniqueId )} }>
              {toDo.value}
            </li>
          ) )}
        </ul>
      </>
    );    
  }
}

export default App;
