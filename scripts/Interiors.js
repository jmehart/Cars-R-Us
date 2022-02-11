import { getInterior, setInterior } from "./dataAccess.js"

//Invoke the getInterior() function created in dataAccess
const interiors = getInterior()

//Iterate the array of interiors and build an HTML representation of that data.
//Define an Interiors function and export to display HTML in the application - will import in CarsRUs module
export const Interiors = () => {
    
    //Start creating a dropdown menu, which uses the <select> HTML element
    //Whichever option the user chooses will then be displayed in the select box
    //Define a name so that we can access that value in an event listener
    //Show the options for interior listed in dropdown by starting with a prompt
    //Value will set the order, and a "0" value will be the default displayed first

    //Here's an example of not defining an HTML element and imediately returning HTML representations of data
    return `<h2>Interiors</h2>
        <select name="interior">
            <option value="0">Select an interior option</option>
            ${
                //The map() array method is a conversion tool and iterates an array.
                //It generates a new array with as many items as are in the original array, 
                //but in the new array, it puts items in the form that you specify.
                interiors.map(
                    //Unlike a for..of loop, .map() invokes the function that you define.
                    //As it iterates the array, it will take the object at the current location and pass it as an argument to your function. Your function defines the interior parameter.
                    (interior) => {
                        //return an HTML element that shows options for the interior dropdown - this will show the wheel values
                        return `<option value="${interior.id}">${interior.seatType}</option>`
                    }
                ).join("")
                //The .join() array method joins things together, such as these HTML elements 
            }
        </select>
    `
    //So an object comes into your function, and a string gets returned. That string goes into a new array.
}

//**Look in Technologies module for an example array that .map generates and the .join


//Create an event listener to dispatch the "stateChanged" that the main module is listening for
//This custom change event should store the interior option chosen to transient state and disaply "State of data has changed. Regenerating HTML..."(in main module) to console

document.addEventListener(
    "change",
    (event) => {
        //Conditional to match the clicked item name that is equal to interior
        //To get the option that the user selected, you would access the .value property of the <select> element ("interior" defined in function above), not the individual options.
        if (event.target.name === "interior") {
            //Invoking setInterior function and takes a string and turns into a number with parseInt
            setInterior(parseInt(event.target.value))
            //Dispatching the event to broadcast that state is changed and to rerender custom state changed in main
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)