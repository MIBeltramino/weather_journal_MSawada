/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const myApiKey = '&appid=f10980eb50c17723ca6d0da2bb456182&units=imperial';
const generate = document.getElementById('generate');
const zip = document.getElementById('zip');
const feeling = document.getElementById('feelings');
const temp = document.getElementById('temp');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Begins process to receive, process, post the data, and update the UI
generate.addEventListener('click', beginSequence);

function beginSequence(e){

    //gets zip  input value when generate button is clicked
    const collateUserInput = baseUrl + zip.value + myApiKey;

    //prevents the process from attempting to run on absent data
    e.preventDefault();

    //Retrieves the user's input to generate url
    userInput(collateUserInput)

    //Splices the data for the desired information to return
    .then(async function projectData(dataNew){
        try{
            if(dataNew.cod === 200){
                const data = {
                    newDate,
                    feelings: feelings.value,
                    temp: dataNew.main.temp
                };
                console.log(data);
                postData('/add', dataNew);
            }else{
                console.log("Error");
                return dataNew
            };
        }catch{
            console.log("Error", error);
        };
    });
    updateUI('/all');
};


//Retrieve user input and collect data from API
const userInput = async (dataSource) =>{
    try{
        //Wait for data before attempting to process
        const incomingData = await fetch(dataSource);
        const dataNew = await incomingData.json();
        if(dataNew.cod === 200){
            console.log(dataNew);
            console.log("Data collected from API");
            return dataNew;
        }else{
            console.log("Invaild input.");
            alert("Uh oh! Something went wrong. Please re-enter data and click the generate button.");
        };

    }catch(error){
        console.log("Error", error);
    }
};

//POST info from API
const postData = async (url = '', dataNew = {})=>{
        //fetch (receive GET req) data
        const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataNew),
        });
        try{
            const addData = await res.json();
            console.log("Data posted");
            return addData
        }catch(error){
            console.log("Error. Issue receiving data.", error);
        };
};

//Retrieve info from API
const getPost = async (url) =>{
    const reply = await fetch(url);
    try{
        const retrieved = await reply.json();
        return retrieved;
    }catch(error){
        console.log("Error. Data could not be received.");
    }
};

//Update UI
const updateUI = async ()=>{
    const requestingData = await fetch('/all');
    try{
        const dataSet = await requestingData.json()
        document.getElementById('temp').innerHTML.HTML = Math.round(dataSet.temp)+ 'degrees';
        document.getElementById('content').innerHTML = dataSet.feelings;
        document.getElementById('date').innerHTML = dataSet.date;
    }catch(error){
        console.log("Error.", error);
    }
};
