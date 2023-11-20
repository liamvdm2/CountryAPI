function getCountryInfo() {
    const countryInput = document.getElementById('countryInput');
    const countryName = countryInput.value;

    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayCountryInfo(data);
        })
        .catch(error => {
            console.error('Error fetching country information:', error);
        });
}

function displayCountryInfo(data) {
    const countryInfoDiv = document.getElementById('countryInfo');
    const flagColumnDiv = document.getElementById('flagColumn');
    countryInfoDiv.innerHTML = '';
    flagColumnDiv.innerHTML = '';
    function formatArea(area) {
        if (area === 'N/A') {
            return area;
        }

        // Convert the area to millions or billions if applicable
        if (area >= 1000000) {
            return (area / 1000000).toFixed(2) + ' million km²';
        } else if (area >= 1000) {
            return (area / 1000).toFixed(2) + ' thousand km²';
        } else {
            return area + ' km²';
        }
    }

    if (data.length > 0) {
        const country = data[0];
        const countryName = country.name.common;
        const capital = country.capital[0];
        const flagUrl = country.flags.svg;
        const languages = Object.values(country.languages).join(', ');
        const currencies = Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ');
        const region = country.region;
        const area = formatArea(country.area);
        const borders = country.borders ? country.borders.join(', ') : 'None';
        const timezones = country.timezones.join(', ');
        const subregion = country.subregion;




        const countryHTML = `
        <h2>${countryName}</h2>
        <p style="font-weight: bold; border: 1px solid black;">Capital: ${capital}</p>
        <p style="color: red; border: 1px solid red;">Languages: ${languages}</p>
        <p style="font-weight: bold; border: 1px solid black;">Currencies: ${currencies}</p>
        <p style="font-weight: bold; border: 1px solid black;">Region: ${region}</p>
        <p style="font-weight: bold; border: 1px solid black;">Area: ${area} </p>
        <p style="color: green; border: 1px solid green;">Borders: ${borders}</p>
        <p style="color: blue; border: 1px solid blue;">Timezones: ${timezones}</p>
        <p style="font-weight: bold; border: 1px solid black;">Subregion: ${subregion}</p>
        
      `;

        countryInfoDiv.innerHTML = countryHTML;
        flagColumnDiv.innerHTML = `<img src="${flagUrl}" alt="${countryName} Flag">`;
    } else {
        countryInfoDiv.innerHTML = '<p>Country not found. Please check the name and try again.</p>';
    }
}

