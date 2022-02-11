import { getTechnology, setTechnology } from "./dataAccess.js"

//Invoke the getTechnology() function created in dataAccess
const techs = getTechnology()

//Iterate the array of technology and build an HTML representation of that data.
//Define a Technologies function and export to display HTML in the application - will import in CarsRUs module
export const Technologies = () => {
    //define the HTML and then add on to it
    let html = "<h2>Technologies</h2>"

    //Start creating a dropdown menu, which uses the <select> HTML element
    //Whichever option the user chooses will then be displayed in the select box
    //Define a name so that we can access that value in an event listener
    html += '<select name="tech">'
    //Show the options for tech packages listed in dropdown by starting with a prompt
    //Value will set the order, and a "0" value will be the default displayed first
    html += '<option value="0">Select a technology package</option>'

    //The map() array method is a conversion tool and iterates an array.
    //It generates a new array with as many items as are in the original array, 
    //but in the new array, it puts items in the form that you specify.
    const arrayOfTechOptions = techs.map(
        //Unlike a for..of loop, .map() invokes the function that you define.
        //As it iterates the array, it will take the object at the current location and pass it as an argument to your function. Your function defines the technology parameter.
        (tech) => {
            //return an HTML element that shows options for the tech dropdown - this will show the package values
            return `<option value="${tech.id}" >${tech.techPackage}</option>`

        })
    //So an object comes into your function, and a string gets returned. That string goes into a new array.

    //The .join() array method joins things together, such as these HTML elements    
    html += arrayOfTechOptions.join("")
    //Don't forget the closing tag and return all of the HTML established in this function so that it displays when invoked
    html += "</select>"
    return html
}

/*
Array that Map() Generates:
[
    "<select id="tech"> <option value="1" /> Basic Package (basic sound system) </select>",
    "<select id="tech"> <option value="2" /> Navigation Package (includes integrated navigation controls) </select>",
    "<select id="tech"> <option value="3" /> Visibility Package (includes side and reat cameras) </select>",
    "<select id="tech"> <option value="4" /> Ultra Package (includes navigation and visibility packages) </select>"
 ]
 

 .join updates the generated array above into one long string filled with HTML:

    "<select id="tech"> <option value="1" /> Basic Package (basic sound system) </select>
    <select id="tech"> <option value="2" /> Navigation Package (includes integrated navigation controls) </select>
    <select id="tech"> <option value="3" /> Visibility Package (includes side and reat cameras) </select>
    <select id="tech"> <option value="4" /> Ultra Package (includes navigation and visibility packages) </select>"
*/


//Create an event listener to dispatch the "stateChanged" that the main module is listening for
//This custom change event should store the tech option chosen to transient state and disaply "State of data has changed. Regenerating HTML..."(in main module) to console

document.addEventListener(
    "change",
    (event) => {
        //Conditional to match the clicked item name that is equal to tech
        //To get the option that the user selected, you would access the .value property of the <select> element ("tech" defined in function above), not the individual options.
        if (event.target.name === "tech") {
            //Invoking setTechnology function and takes a string and turns into a number with parseInt
            setTechnology(parseInt(event.target.value))
            //Dispatching the event to broadcast that state is changed and to rerender custom state changed in main
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)