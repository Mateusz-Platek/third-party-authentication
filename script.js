let clickCount = 0;

const countryInput = document.getElementById('country');
const form = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common);
        countries.sort();
        countryInput.innerHTML = countries.map(country => `<option value="${country}">${country}</option>`).join('');
        getCountryByIP();
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

function getCountryByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const country = data.country;
            const select = document.getElementById("country");
            for (const option of select.options) {
                if (option.value === country) {
                    option.selected = true;
                    break;
                }
            }
            getCountryCode(country)
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

function getCountryCode(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        return response.json();
    })
    .then(data => {        
        const countryCode = data[0].idd.root + data[0].idd.suffixes.join("");
        const select = document.getElementById("countryCode");
        for (const option of select.options) {
            if (option.value === countryCode) {
                option.selected = true;
                break;
            }
        }
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });
}

(() => {
    document.addEventListener('click', handleClick);
    fetchAndFillCountries();
    document.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            form.submit();
        }
    });
})()
