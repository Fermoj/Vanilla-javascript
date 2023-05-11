window.addEventListener("DOMContentLoaded", () => {
  const url = "https://avancera.app/cities/";
  const inputName = document.querySelector("#inputForm2Name");
  const inputPopulation = document.querySelector("#inputForm2Population");
  const inputId = document.querySelector("#inputForm2Id");
  const postButton = document.querySelector("#postbtn");
  const putButton = document.querySelector("#putbtn");
  const result2 = document.querySelector(".result2");

  // funktion för att lägga till stad på listan
  function createCity(cityName, cityPopulation) {
    let city = cityName;
    let pop = cityPopulation;
    return (
      fetch(`${url}`, {
        body: `{"name": "${city}", "population": ${pop}} `,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        //responsen förväntas i Json
        .then((res) => {
          let resJson = res.json();
          console.log(resJson);
          return resJson;
        })
        //responsen som hämtar data/innehåll
        .then((data) => {
          result2.innerHTML = "";
          console.log(data);
          //forEach har en funktion som är inom parentesen, den kan döpas til vad som helst och här döpt till obj för att den ska loopa igenom varje objekt. Hade kunnat döpas till cities också.
          //index för att numrera värdena som hämtas.
          data.forEach((obj, index) => {
            result2.innerHTML += `
            <tr data-id="${obj.id}">
              <th scope="row">${index + 1}</th>
              <td>${obj.name}</td>
              <td>${obj.population}</td>
            </tr>
          `;
          });
        })
    );
  }
  postButton.addEventListener("click", () => {
    console.log(inputName.value + "  " + Number(inputPopulation.value));

    createCity(
      inputName.value,
      Number(inputPopulation.value)
    ).then((city) => {});
  });

  // funktion som skapar listan med cities
  function renderCities() {
    return (
      fetch(`${url}`)
        .then((res) => res.json())
        //Data står för arrayen och hade lika gärna kunnat döpas till något annat som representerar innehållet.
        .then((data) => {
          result2.innerHTML = "";
          data.forEach((obj, index) => {
            result2.innerHTML += `
            <tr data-id="${obj.id}">
              <th scope="row">${index + 1}</th>
              <td>${obj.name}</td>
              <td>${obj.population}</td>
              <td>${obj.id}</td>
            </tr>
          `;
          });
        })
    );
  }

  // fuktion som gör put-request
  function changeCity(cityId, cityName, cityPopulation) {
    let city = cityName;
    let pop = cityPopulation;
    let id = cityId;
    return fetch(`${url}${id}`, {
      body: `{"id": "${id}", "name": "${city}", "population": ${pop}} `,
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    })
      .then((res) => {
        console.log(res);
        let resJson = res.json();
        console.log(resJson);
        return resJson;
      })
      .then((data) => {
        result2.innerHTML = "";
        console.log(data);
        data.forEach((obj, index) => {
          result2.innerHTML += `
          <tr data-id="${obj.id}">
            <th scope="row">${index + 1}</th>
            <td>${obj.name}</td>
            <td>${obj.population}</td>
            <td>${obj.id}</td>
          </tr>
        `;
        });
      });
  }

  putButton.addEventListener("click", () => {
    console.log(inputName.value + "  " + Number(inputPopulation.value));

    changeCity(
      inputId.value,
      inputName.value,
      Number(inputPopulation.value)
    ).then((city) => {});
  });

  renderCities();
});
