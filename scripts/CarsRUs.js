//Import all the modules that create options groups to create a car
import { Paints } from "./Paints.js"
import { Interiors } from "./Interiors.js"
import { Technologies } from "./Technologies.js"
import { Wheels } from "./Wheels.js"
import { Orders } from "./Orders.js"

//Create the overall HTML structure
//Interpolate the four modules in their proper places in the overall HTML structure

export const CarsRUs = () => {
    return ` 
    <h1>Cars R Us</h1>

    <article class="choices">
    <section class="paintOptions">
        ${Paints()}
    </section>
    <section class="interiorOptions">
        ${Interiors()}
    </section>
    <section class="techOptions">
        ${Technologies()}
    </section>
    <section class="wheelOptions">
        ${Wheels()}
    </section>
    </article>

    <article>
    <p></p>
    <button id="orderButton">Place Car Order</button>
    </article>

    <article class="customOrders">
    <h2>Custom Jewelry Orders</h2>
    <section class="anOrder">
        ${Orders()}
    </section>
    </article>
    `
}