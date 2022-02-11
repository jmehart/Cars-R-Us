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
      database.orderBuilder.colorId = id
}
    
export const setInterior = (id) => {
    database.orderBuilder.interiorId = id
}
    
export const setTechnology = (id) => {
    database.orderBuilder.technologyId = id
}

export const setWheels = (id) => {
    database.orderBuilder.wheelsId = id
}


//getState is created in case a module and function need to access the transient state for a condtional to compare a chosen option against state
//We may not need this for this application since there are no radio buttons that would need to compare state in order to uncheck unselected buttons
export const getState = () => {
    return {...database.orderBuilder}
}