document.getElementById('getJokeBtn').addEventListener('click', getJoke);

function getJoke() {
    // Make a request to the JokeAPI
    fetch('https://v2.jokeapi.dev/joke/Any')
        .then(response => response.json())
        .then(data => {
            // Check if the response contains a joke or setup & delivery
            const joke = data.type === 'twopart' ? `${data.setup} ${data.delivery}` : data.joke;

            // Display the joke
            document.getElementById('jokeText').innerText = joke;
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
        });
}