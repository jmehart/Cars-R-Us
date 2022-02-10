import { getWheels } from "./dataAccess.js"

const wheels = getWheels()

export const Wheels = () => {
    let html = "<h2>Wheels</h2>"

    html += '<select id="wheel">'
    html += '<option value="0">Select a wheel type</option>'

    const arrayOfOptions = wheels.map( (wheel) => {
            return `<option value="${wheel.id}">${wheel.wheelType}</option>`
        }
    )

    html += arrayOfOptions.join("")
    html += "</select>"
    return html
}