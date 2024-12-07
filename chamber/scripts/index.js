async function fetchMembers() {
  const response = await fetch("data/members.json");
  const members = await response.json();
  return members;
}

function displayBusiness(members) {
  const goldMembers = 3;
  const silverMembers = 2;

  const container = document.querySelector(".businesses");
  container.innerHTML = "";

  members
    .filter((member) => [goldMembers, silverMembers].includes(member.membershipLevel))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .forEach((member) => {
      const card = `
            <div class="business-card">
                <h3>${member.name}</h3>
                <p>${member.description}</p>
                <div class="business-image">
                    <img src="${member.image}" alt="${member.name} loading="lazy">
                </div>
                <ul>
                <li><strong>Email:</strong> ${member.email}}</li>
                <li><strong>Phone:</strong> ${member.phone}</li>
                <li><strong>URL:</strong> <a>${member.website}</a></li>
                </ul>
            </div>
        `;
      container.innerHTML += card;
    });
}

async function fetchWeatherData() {
  const apiKey = "6687f299af86bf33c4059e8bffc39152";
  const city = "Londrina";
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(weatherApiUrl);
    if (!response.ok) throw new Error("Erro ao buscar os dados do clima");

    const data = await response.json();
    updateWeatherSection(data);
  } catch (error) {
    console.error("Erro:", error);
  }
}

function updateWeatherSection(data) {
  const dataList = [];

  const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  for (let i = 0; dataList.length < 3; i++) {
    var selectedDate = data.list[i];
    var date = new Date(selectedDate.dt_txt);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    dataList.map((x) => x.DayName).includes(dayName)
      ? null
      : dataList.push({
        DayName: dayName,
        Description: data.list[i].weather[0].description,
        Temp: data.list[i].main.temp,
        HighTemp: data.list[i].main.temp_max,
        LowTemp: data.list[i].main.temp_min,
        Humidity: data.list[i].main.humidity,
        Icon: data.list[i].weather[0].icon,
      });
  }

  const currentWeather = dataList[0];
  const currentWeatherDiv = document.querySelector(".current-weather");
  currentWeatherDiv.innerHTML = `
      <div>
        <img src="https://openweathermap.org/img/wn/${currentWeather.Icon}@2x.png" alt="Weather Icon">
      </div>
      <div>
        <p><strong>Temperature:</strong> ${currentWeather.Temp}°C</p>
        <p><strong>Description:</strong> ${currentWeather.Description}</p>
        <p><strong>High:</strong> ${currentWeather.HighTemp}°C</p>
        <p><strong>Low:</strong> ${currentWeather.LowTemp}°C</p>
        <p><strong>Humidity:</strong> ${currentWeather.Humidity}%</p>
        <p><strong>Sunrise:</strong> ${sunrise}</p>
        <p><strong>Sunset:</strong> ${sunset}</p>
      <div>  
    `;

  const forecastDiv = document.querySelector(".weather-forecast");
  forecastDiv.innerHTML = dataList
    .map((date, index) => { return `<p><strong>${index == 0 ? "Today" : date.DayName}</strong>: ${date.Temp}°C </p><br>`;})
    .join("");
}

(async () => {
  const members = await fetchMembers();
  displayBusiness(members);

  await fetchWeatherData();
})();
