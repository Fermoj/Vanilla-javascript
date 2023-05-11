function getPokemon(name) {
  const errorShow = document.querySelector(".error-alert");
  errorShow.innerHTML = " ";
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  return fetch(`${baseUrl}${name}`)
    .then((res) => res.json())
    .catch(
      (error) =>
        (errorShow.innerHTML = ` <div class="alert alert-danger" role="alert"> Pokemon could not be found, please try again! </div>`)
    );
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
//Det som är i funktionen startas igång dirket. Funktioner utanför init måste vänta på att bli kallade.
function init() {
  const input = document.querySelector(".formSearch input");
  const submit = document.querySelector(".submit");
  const result = document.querySelector(".result");

  // namnlös och lokal funktion för att den används endast i samband med submit knappen.
  submit.addEventListener("click", () => {
    // console.log("click", input.value);
    localStorage.input = input.value;
    getPokemon(input.value).then((poke) => {
      // console.log("res", poke);
      result.innerHTML = `
        <div class="card" style="width: 18rem; margin-left: 38vw">
          <img src="${
            poke.sprites.other.dream_world.front_default
          }" class="card-img-top" alt="Picture of pokemon"/>
          <div class="card-header">
            <div>${poke.id}.<h1>${capitalizeFirstLetter(poke.name)}</h1></div>

          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"> Type: ${poke.types[0].type.name}</li>
            <li class="list-group-item"> Weight: ${poke.weight} g</li>
            <li class="list-group-item"> Height: ${poke.height} cm</li>
          </ul>
        </div>
      `;
    });
  });
}
init();

// Fetch för att hämta data till charten
const url2 = "https://pokeapi.co/api/v2/pokemon/";
const ctx = document.getElementById("myChart");

fetch(url2)
  .then((res) => res.json())
  .then((result) => {
    let pokeNames = [];
    let pokeNumber = [];

    for (let i = 0; i < result["results"].length; i++) {
      pokeNames.push(result["results"][i]["name"]);
      //istället för multiplikationen med ex. 1000 går det även att använda math.floor
      pokeNumber.push(parseInt(Math.random(result["results"].length) * 1000));
    }

    console.log(pokeNumber);
    // Chart diagram
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: pokeNames,
        datasets: [
          {
            label: "Most searched Pokemon",
            data: pokeNumber,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
