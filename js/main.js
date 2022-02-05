
// dog image
let dog_img_url = "https://dog.ceo/api/breeds/image/random";


document.getElementById("submit").addEventListener("click", createURL);


function createURL() {
    let var_name = document.getElementById("name").value;
    
    let gender_url = ` https://api.genderize.io?name=${var_name}`;
    let age_url = ` https://api.agify.io/?name=${var_name}`;
    let country_url = ` https://api.nationalize.io/?name=${var_name}`;

    // Promises way of doing things "promise chain"
    fetchData(gender_url).then(
        () => fetchData(age_url)
    ).then(
        () => fetchData(country_url)
    );
}

// async await (best way of doing it?)
async function fetchData(url) {
    let result = await fetch(url);
    let data = await result.json();
    console.log(data);
}