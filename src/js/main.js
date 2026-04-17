"use strict";

import "../css/main.scss";

const APIURL = "http://localhost:3000/api/workexperience";  // Variabel som lagrar länken till APIet
const experienceList = document.getElementById("erfarenhet-lista");  // Hämtar listan där erfarenheterna lagras från DOM

// Funktion för att anropa APIet med fetch, async, await, try och catch
async function loadWorkExperience () {
    try {
        const response = await fetch(APIURL);
        const data = await response.json();

        experienceList.innerHTML = "";

        // Loopar igenom listan för att visa punkterna
        data.forEach(item => {
            const li = document.createElement("li");
            li.classList.add("experience-item");

            // Skapar text för de olika delarna i varje punkt i listan
            li.innerHTML = `
            <h3>${item.company_name}</h3>
            <p>${item.position}</p>
            <p>${item.location}</p>
            <p>${item.start_date} - ${item.end_date}</p>
            <p>${item.description}</p>
            <button id="delete-button" data-id="${item.id}">Radera</button>
            `;

            experienceList.appendChild(li);
        });
    } catch (error) {
        experienceList.innerHTML = "<p>Kunde inte läsa in data</p>"  // Felmeddleande om datan inte kan läsas in
    }
}

// Eventlyssnare för delete-knappen som tar bort en post
document.addEventListener("click", async (e) => {
    if (e.target.matches("button[data-id]")) {
        const id = e.target.dataset.id;

        // Använder fetch och metoden DELETE för att radera en punkt
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