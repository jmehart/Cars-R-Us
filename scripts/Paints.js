import { getPaints, setPaint } from "./dataAccess.js"

//Invoke the getPaints() function created in dataAccess in order to iterate through the copied array
const paints = getPaints()

//Iterate the array of paints and build an HTML representation of that data.
//Define a Paints function and export to display HTML in the application - will import in CarsRUs module
export const Paints = () => {
    //define the HTML and then add on to it
    let html = "<h2>Paints</h2>"

    //Start creating a dropdown menu, which uses the <select> HTML element
    //Whichever option the user chooses will then be displayed in the select box
    //Define a name "paint" so that we can access that value in an event listener
    html += '<select name="paint">'
    //Show the options for paint colors listed in dropdown by starting with a prompt
    //Value will set the order, and a "0" value will be the default displayed first
    html += '<option value="0">Select a paint color</option>'

    //A for..of loop iterates an array so that we can access properties in the paint array we copied into getPaint()
    //Iterate the paints array that we invoked up top
    for (const paint of paints) {
         //amend the HTML element that shows options for the paint dropdown - this will show the paint colors
 //QUESTION:    // WHY DO WE AMEND THE HTML IN A FOR..OF LOOP BUT WE HAVE TO RETURN AN HTML ELEMENT IN .MAP()?
                // We're not invoking the function we define like .map?
        html += `<option value="${paint.id}">${paint.color}</option>`
    }

    //Don't forget the closing tag and return all of the HTML established in this function so that it displays when invoked
    html += "</select>"
    return html
    
}

//Create an event listener to dispatch the "stateChanged" that the main module is listening for
//This custom change event should store the paint option chosen to transient state and disaply "State of data has changed. Regenerating HTML..."(in main module) to console


document.addEventListener(
    "change",
    (event) => {
        //Conditional to match the clicked item name that is equal to paint
        //To get the option that the user selected, you would access the .value property of the <select> element ("paint" defined in function above), not the individual options.
        if (event.target.name === "paint") {
            //Invoking setPaint function and takes a string and turns into a number with parseInt
            setPaint(parseInt(event.target.value))
            //Dispatching the event to broadcast that state is changed and to rerender custom state changed in main
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)