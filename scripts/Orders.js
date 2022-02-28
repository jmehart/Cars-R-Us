import { getInterior, getPaints, getTechnology, getWheels, addCustomOrder, getOrders } from "./dataAccess.js"

const paints = getPaints()
const techs = getTechnology()
const interiors = getInterior()
const wheels = getWheels()

// create a function that creates an order html element that outputs the total cost of an order
// returns a string that represents html

const buildOrderListItem = (order) => {

    // finding the paint id and storing the value in a function - comparing id of paints array to transient state of paintId property
    //repeats for others below
    const foundPaint = paints.find( // gives you first thing that it finds that is true/first thing that satisfies the condition
        (paint) => {
            //outputting a single object
            return paint.id === order.paintId
        }
    )
 
    const foundTechnology = techs.find(
        (tech) => {
            return tech.id === order.technologyId
        }
    )

    const foundInterior = interiors.find(
        (interior) => {
            return interior.id === order.interiorId
        }
    )

    const foundWheels = wheels.find(
        (wheel) => {
            return wheel.id === order.wheelId
        }
    )

    // getting the sum of the cost for all and stores value
    let totalCost = foundPaint.price + foundTechnology.price + foundInterior.price + foundWheels.price

        // function that creates a us dollar output
        //toLocalString is getting the english language with en and style with US
    const costString = totalCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
    })

    // outputting an html string as a list item to display the order and it's cost
    // interpolating the costString created above and the order with id
    return `<li>
        Order #${order.id} was placed on ${order.timestamp} and costs ${costString}.
        <p>
        The custom car is ${foundPaint.color} with ${foundWheels.wheelType}, ${foundInterior.seatType} interior, and the ${foundTechnology.techPackage}.
        </p>
    </li>`
}

// creating a component function that generates html for the custom car orders container as an unordered list and uses the above function
export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
        - this is permanent state and this function will take transient state to store it permanently
    */
    const orders = getOrders()

    let html = "<ul>"
    //invoking the buildOrderListItem function above to generate html
    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}


// create an event listener that checks if the create custom order button is clicked, if it is then
document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id === "orderButton") {
            addCustomOrder()
        }
    }
)