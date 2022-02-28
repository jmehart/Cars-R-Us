import { database } from "./database.js"

//This module contains state for the application
//Export functions that return copies of current state for each array, get() and set()
//No other modules are allowed to have direct access to the database, or else original data would be modified
//get() allows other modules to "get" copies of state

export const getPaints = () => {
    return database.paintColor.map(paint => ({...paint}))
}

export const getInterior = () => {
    return database.interior.map(interior => ({...interior}))
}

export const getTechnology = () => {
    return database.technology.map(tech=> ({...tech}))
}

export const getWheels = () => {
    return database.wheels.map(wheel => ({...wheel}))
}

//We'll need a getOrders function to access the customOrders transient state properties to create a custom orders permanent state and display an HTML representation of data
export const getOrders = () => {
    return database.customOrders.map(order => ({...order}))
}

//You have exported functions that return copies of the current state. Other modules invoke those function to get state.
//Now you need to export functions whose responsibility is to set state.

//set() method is used to convert any of the iterable to sequence of iterable elements with distinct elements, commonly called Set. 
//Main difference is that set() will disclude any duplicate elements/properties
//The sets created here will store current state in the orderBuilder object
//Notice how they create the colorId, interiorID, etc. properties so that we can access those values in the modules to compare against state

//Instead of just showing an alert when a paint is chosen, you now need to set the corresponding property of the order builder object in application state.
export const setPaint = (id) => {
      database.orderBuilder.paintId = id
}
    
export const setInterior = (id) => {
    database.orderBuilder.interiorId = id
}
    
export const setTechnology = (id) => {
    database.orderBuilder.technologyId = id
}

export const setWheels = (id) => {
    database.orderBuilder.wheelId = id
}


//getState is created in case a module and function need to access the transient state for a condtional to compare a chosen option against state
//We need this for when would need to compare state in order to unselect unselected buttons(you'll see this in conditionals in the modules)
export const getState = () => {
    return {...database.orderBuilder}
}


//Create a function that stores transient state values into a permanent state
export const addCustomOrder = () => {
    // Copy the current state of user choices
    //knows the choices/whats clicked because setter functions are invoked
    const newOrder = {...database.orderBuilder}

    // Add a new primary key to the object
    //defines an immutable(const) variable named lastIndex
    const lastIndex = database.customOrders.length 
    newOrder.id = lastIndex + 1

    // Add a timestamp to the order
    newOrder.timestamp = Date.now()

    // Add the new order object to custom orders state
    // has the state of what you've been selecting and pushed into custoOrders permanent state (it's still in transient state still at this point)
    database.customOrders.push(newOrder)

    // Reset the temporary state for user choices
    database.orderBuilder = {}

    // Broadcast a notification that permanent state has changed
    document.dispatchEvent(new CustomEvent("stateChanged"))
}