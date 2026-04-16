"use strict";

const APIURL = "http://localhost:3000/api/workexperience";
const experienceList = document.getElementById("erfarenhet-lista");

async function loadWorkExperience () {
    try {
        const response = await fetch(APIURL);
        const data = await response.json();

        experienceList.innerHTML = "";

        data.forEach(item => {
            const li = document.createElement("li");

            li.innerHTML = `
            <h3>${item.company_name}</h3>
            <p>${item.position}</p>
            <p>${item.location}</p>
            <p>${item.start_date} - ${item.end_date}</p>
            <p>${item.description}</p>
            <button data-id="${item.id}">Radera</button>
            `;

            experienceList.appendChild(li);
        });
    } catch (error) {
        experienceList.innerHTML = "<p>Kunde inte läsa in data</p>"
    }
}

document.addEventListener("click", async (e) => {
    if (e.target.matches("button[data-id]")) {
        const id = e.target.dataset.id;

        try {
            await fetch(`${APIURL}/${id}`, {
                method: "DELETE"
            });

            loadWorkExperience();
        } catch (error) {
            alert("Kunde inte radera posten")
        }
    }
});

loadWorkExperience();