"use strict";

import "../css/main.scss";

const APIURL = "http://localhost:3000/api/workexperience";  // Variabel som lagrar länken till APIet
const form = document.getElementById("form");  // Hämtar formuläret som användaren fyller i för att lägga till en post från DOM
const messageEl = document.getElementById("message");  // Hämtar felmeddelande från DOM

// Funktion för att validera så att alla fält i formuläret är ifyllda innan posten läggs till
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

// Eventlyssnare som lyssnar på när formuläret skickas in
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Läser det som användaren har skrivit i formuläret
    const formData = {
        company_name: form.company_name.value,
        position: form.position.value,
        location: form.location.value,
        description: form.description.value,
        start_date: form.start_date.value,
        end_date: form.end_date.value
    };

    const errorsForm = validateForm(formData);

    // Skapar felmeddelande om något inte är ifyllt
    if (errorsForm.length > 0) {
        messageEl.innerHTML = errorsForm.map(err => `<p>${err}</p>`).join("");
        return;
    }

    // Fetchar APIet med metoden post och skapar då innehåll till en ny punkt
    try {
        const response = await fetch(APIURL, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        // Går innehållet inte att lagra skrivs det ut ett felmeddelande
        if (!response.ok) {
            throw new Error("Fel vid lagring");
        }

        messageEl.innerHTML = "<p>Posten sparades</p>";
        form.reset();
    } catch (error) {
        messageEl.innerHTML = "<p>Något gick fel. Försök igen</p>";
    }
});