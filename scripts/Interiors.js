import { getInterior } from "./dataAccess.js"

const interiors = getInterior()

export const Interiors = () => {
    return `<h2>Interiors</h2>
        <select id="interior">
            <option value="0">Select an interior option</option>
            ${
                interiors.map(
                    (interior) => {
                        return `<option value="${interior.id}">${interior.seatType}</option>`
                    }
                ).join("")
            }
        </select>
    `
}