import { getWheels, setWheels, getState } from "./dataAccess.js"

//Invoke the getWheels() function created in dataAccess
const wheels = getWheels()

//The function below is a one string template
//Iterate the array of wheels and build an HTML representation of that data.
//Define a Wheels function and export to display HTML in the application - will import in CarsRUs module
export const Wheels = () => {
    //define the HTML and then add on to it
    let html = "<h2>Wheels</h2>"

    //Invoking the getState function to access transient state
    const state = getState()

    //Start creating a dropdown menu, which uses the <select> HTML element
    //Whichever option the user chooses will then be displayed in the select box
    //Define a name so that we can access that value in an event listener
    html += '<select name="wheel">'
    //Show the options for wheels listed in dropdown by starting with a prompt
    //Value will set the order, and a "0" value will be the default displayed first
    html += '<option value="0">Select a wheel type</option>'

    //The map() array method is a conversion tool and iterates an array.
    //It generates a new array with as many items as are in the original array, 
    //but in the new array, it puts items in the form that you specify.
    const arrayOfOptions = wheels.map(
        //Unlike a for..of loop, .map() invokes the function that you define.
        //As it iterates the array, it will take the object at the current location and pass it as an argument to your function. Your function defines the wheels parameter.
        (wheel) => {
            //Conditional to match the wheel id with the property wheelId in the transient state
            //Without this, the selected option would not take the place of "select a wheel color" as default display.
            if (wheel.id === state.wheelId) {
                //return an HTML element that shows options for the wheels dropdown - this will show the package values
                //Notice the word selected after option tag
                return `<option selected value="${wheel.id}">${wheel.wheelType}</option>`
                //Conditional that updates the dropdowm to appear unselected if it's not in state (if false)
            } else {
                return `<option value="${wheel.id}">${wheel.wheelType}</option>`
            }
        })
    //So an object comes into your function, and a string gets returned. That string goes into a new array.

    //The .join() array method joins things together, such as these HTML elements    
    html += arrayOfOptions.join("")
    //Don't forget the closing tag and return all of the HTML established in this function so that it displays when invoked
    html += "</select>"
    return html
}

//**Look in Technologies module for an example array that .map generates and the .join


//Create an event listener to dispatch the "stateChanged" that the main module is listening for
//This custom change event should store the wheel option chosen to transient state and disaply "State of data has changed. Regenerating HTML..."(in main module) to console

document.addEventListener(
    "change",
    (event) => {
        //Conditional to match the clicked item name that is equal to wheel
        //To get the option that the user selected, you would access the .value property of the <select> element ("wheel" defined in function above), not the individual options.
        if (event.target.name === "wheel") {
            //Invoking setWheels function and takes a string and turns into a number with parseInt
            setWheels(parseInt(event.target.value))
            //Dispatching the event to broadcast that state is changed and to rerender custom state changed in main
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)