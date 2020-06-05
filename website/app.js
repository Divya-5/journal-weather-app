/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = 'f4d34e2aa725c440a9130979517fc274';
// Create a new date instance dynamically with JS



const performAction = async function () {
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  const url = `${baseURL}${zip}&APPID=${apiKey}`;
  if (zip.length === 0 || feelings.length === 0) {
    alert("Please fill up all values !");
    return
  }
  let weatherData = await fetchDataWeather(url);
  let temp = weatherData.main.temp;
  let d = new Date();
  let date = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
  const data = {
    date: date,
    temp: temp,
    content: content,
  }
  await postData("http://localhost:3000/projectData", data);
  updateUI()


}

const fetchDataWeather = async (url) => {

  const res = await fetch(url)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

const updateUI = async () => {
  const allData = await getData('http://localhost:3000/projectData');
  document.getElementById('date').innerHTML = allData.date;
  document.getElementById('temp').innerHTML = allData.temp;
  document.getElementById('content').innerHTML = allData.content;
}


const postData = async (url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(data),
  });
  return await response.json();
}

const getData = async function (url) {
  let response = await fetch(url)
  try {
    let data = response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
  }

}

document.getElementById('generate').addEventListener('click', performAction);