import { CarsRUs } from "./CarsRUs.js"

//define mainContainer to target the container HTML element 
//returns the first element that matches the selectors
const mainContainer = document.querySelector("#container")

//define a renderAllHTML function and invoke it
//this is necessary when we the HTML will be rerendered every time someone chooses an option for a car
const renderAllHTML = () => {
    mainContainer.innerHTML = CarsRUs()
}

renderAllHTML()

//as a user chooses an option, state of data will change and HTML will regenerate to display the new state
//each module and dataAccess dispatched a custom event "stateChanged" and this event listener listens for those event changes to then know to rerender custom state changed
document.addEventListener("stateChanged", event => {
    console.log("State of data has changed. Regenerating HTML...")
    renderAllHTML()
})