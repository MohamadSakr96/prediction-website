let data_array = [];
let render_index = 0;
let dog_img_url = "https://dog.ceo/api/breeds/image/random";
let input = document.getElementById("name");


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

$(document).ready(() => {
    fetchImage(dog_img_url);
    $("button").click(createURL);
});


function createURL() {
    let var_name = $("input").val();
    $("input").val('');
    if (var_name.length > 2) {
        // to prevent the user from spamming the button (and load the array with unwanted data)
        $("button").attr("disabled", true);
        
        data_array.push(var_name);

        let gender_url = ` https://api.genderize.io?name=${var_name}`;
        let age_url = ` https://api.agify.io/?name=${var_name}`;
        let country_url = ` https://api.nationalize.io/?name=${var_name}`;

        
        $("input").attr("placeholder", "Please Enter a Name").placeholder;

        // Promises way of doing things "promise chain"
        fetchData(gender_url, "gender")
        .then(() => fetchData(age_url, "age"))
        .then(() => fetchData(country_url, "country"))
        .then(() => checkData());
    }else {
        $("input").attr("placeholder", "Please Enter a Valid Name").placeholder;
    }
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

// this function is to check if there we received data 
function checkData() {
    if (data_array.length < 2) {
        $("input").attr("placeholder", "Please Enter a Valid Name").placeholder;
        resetData();
    }else {
        renderData();
    }
}

function renderData() {
    // First render will create the container (we only want 1 container)
    if (render_index === 0){
        document.getElementById("load-data").innerHTML += `
            <div id="elements" class="container data-container">
                <div class="elements title-container">
                    <div class="flex-1">Name</div>
                    <div class="flex-1">Gender</div>
                    <div class="flex-1">Age</div>
                    <div class="flex-3">Nationality</div>
                </div>
            </div>
        `;
    }
    // This div will hold all the data from current data_array
    document.getElementById(`elements`).innerHTML += `
        <div id="elements_${render_index}" class="elements">
            
        </div>
    `;
    // to load all the data inside its corresponding div 
    data_array.forEach(
        (element) => { 
            document.getElementById(`elements_${render_index}`).innerHTML += `
                <div class="flex-1"> ${element} </div>
            `;
        }
    );
    render_index ++;
    resetData();
}
// To reset the array so we can add other names 
function resetData() {
    data_array = [];
    $("button").removeAttr("disabled");
}



