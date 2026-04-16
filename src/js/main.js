"use strict";

const APIURL = "http://localhost:3000/api/workexperience";
const experienceList = document.getElementById("erfarenhet-lista");
const form = document.getElementById("form");
const messageEl = document.getElementById("message");

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


function validateForm(data) {
    const errors = []

    if (!data.company_name.trim()) errors.push("Företagsnamn måste fyllas i.");
    if (!data.position.trim()) errors.push("Jobbtitel måste fyllas i.");
    if (!data.location.trim()) errors.push("Plats måste fyllas i.");
    if (!data.description.trim()) errors.push("Beskrivning måste fyllas i.");
    if (!data.start_date) errors.push("Startdatum måste fyllas i.");
    if (!data.end_date) errors.push("Slutdatum måste fyllas i.");

    return errors;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        company_name: form.company_name.value,
        position: form.position.value,
        location: form.location.value,
        description: form.description.value,
        start_date: form.start_date.value,
        end_date: form.end_date.value
    };

    const errorsForm = validateForm(formData);

    if (errorsForm.length > 0) {
        messageEl.innerHTML = errors.map(err => `<p>${err}</p>`).join("");
        return;
    }

    try {
        const response = await fetch(APIURL, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error("Fel vid lagring");
        }

        messageEl.innerHTML = "<p>Posten sparades</p>";
        form.reset();
    } catch (error) {
        messageEl.innerHTML = "<p>Något gick fel. Försök igen</p>";
    }
});