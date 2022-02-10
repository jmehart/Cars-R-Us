import { getTechnology } from "./dataAccess.js"

const techs = getTechnology()

export const Technologies = () => {
    let html = "<h2>Technologies</h2>"

    html += '<select id="tech">'
    html += '<option value="0">Select a technology package</option>'

    const arrayOfOptions = techs.map( (tech) => {
            return `<option value="${tech.id}">${tech.techPackage}</option>`
        }
    )

    html += arrayOfOptions.join("")
    html += "</select>"
    return html
}