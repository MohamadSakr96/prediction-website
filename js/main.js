var data_array = [];


// dog image
let dog_img_url = "https://dog.ceo/api/breeds/image/random";
// async await (for the dog image)
async function fetchImage(url) {
    let result = await fetch(url);
    let data = await result.json();
    if (data.status === 'success') {
        document.getElementById("image").src = `${data.message}`;
    }else {
        document.getElementById("image").src = "https://images.dog.ceo/breeds/hound-plott/hhh_plott002.JPG";
        console.log("Failed to load image!");
    }
}
fetchImage(dog_img_url);


document.getElementById("submit").addEventListener("click", createURL);


function createURL() {
    let var_name = document.getElementById("name").value;
    console.log(data_array, "when clicked");
    data_array.push(var_name);
    console.log(data_array, "after pushing the new name");

    let gender_url = ` https://api.genderize.io?name=${var_name}`;
    let age_url = ` https://api.agify.io/?name=${var_name}`;
    let country_url = ` https://api.nationalize.io/?name=${var_name}`;

    // Promises way of doing things "promise chain"
    fetchData(gender_url, "gender").then(
        () => fetchData(age_url, "age")
    ).then(
        () => fetchData(country_url, "country")
    ).then(
        () => renderData()
    );
}

// async await (best way of doing it?)
async function fetchData(url, data_type) {
    let result = await fetch(url);
    let data = await result.json();
    
    if (typeof(data[data_type]) === "object") {
        for (let i in data[data_type]) {
            data_array.push(data[data_type][i][`${data_type}_id`]);
        }
    }else {
        data_array.push(data[data_type]);
    }
}


function renderData() {
    console.log(data_array);
    document.body.innerHTML += `
        <div id="elements" class="container">
            
        </div>
    `;
    data_array.forEach(
        (element) => { 
            document.getElementById("elements").innerHTML += `
                <div class="element"> ${element} </div>
            `;
        }
    );
    resetData();
}


function resetData() {
    data_array = [];

}


