/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
// Function to add games to the page
function addGamesToPage(games) {
    const gamesContainer = document.getElementById('games-container');
    
    // Loop through the games array
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        
        // Create a new div for each game card
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        
        // Set the inner HTML of the game card using template literals
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
        `;
        
        // Append the game card to the games container
        gamesContainer.appendChild(gameCard);
    }
}


// Call the function with the GAMES_JSON data to add all games
addGamesToPage(GAMES_JSON);


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const total_contribution = GAMES_JSON.reduce((count, games) => {
    return count + games.backers;
},0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${total_contribution.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const total_pledged = GAMES_JSON.reduce((count, games) => {
    return count + games.pledged;
}, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `${total_pledged.toLocaleString()}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const numGames = GAMES_JSON.length;
gamesCard.innerHTML = numGames;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {

    // Grab the games container where you want to display the games
    const gamesContainer = document.getElementById("games-container");

    // Delete all the child elements inside the gamesContainer
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have not yet met their goal
    let unmet_goal = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    // Use the addGamesToPage function to add the filtered games to the page
    addGamesToPage(unmet_goal);
}



// show only games that are fully funded
function filterFundedOnly() {
    const gamesContainer = document.getElementById("games-container");
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let met_goal = GAMES_JSON.filter ((game) => {
        return game.pledged > game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
addGamesToPage(met_goal);
}

// show all games
function showAllGames() {
    // Add all games from the JSON data to the DOM
    const gamesContainer = document.getElementById("games-container");
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON); // GAMES_JSON contains all the game data
}


// select each button in the "Our Games" section
// const unfundedBtn = document.getElementById("unfunded-btn");
// const fundedBtn = document.getElementById("funded-btn");
// const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

let total_unfunded = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;  // Filter games where pledged amount is less than the goal
});

// Use .length to count the number of unfunded games
let unfundedGamesCount = total_unfunded.length;

// create a string that explains the number of unfunded games using the ternary operator
const totalRaised = 500000; // Total amount raised
const totalGames = 10; // Total number of games

// Use ternary operators for correct pluralization and format
const displayStr = `A total of ${totalRaised.toLocaleString()} has been raised for ${totalGames} game${totalGames === 1 ? '' : 's'}. Currently ${unfundedGamesCount} game${unfundedGamesCount === 1 ? '' : 's'} remain unfunded. We need your help to fund these amazing games!`;

const paragraph = document.createElement('p');
paragraph.innerHTML = displayStr;

descriptionContainer.appendChild(paragraph);


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

 // Sort the games by pledged amount
 const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// Use destructuring to grab the top two games
const [firstGame, secondGame] = sortedGames;

// Create and append the name of the first (top funded) game
const firstGameName = document.createElement("h3");
firstGameName.innerHTML = firstGame.name; // Set the name of the top funded game
firstGameContainer.appendChild(firstGameName); // Append the name to the container

// Create and append the name of the second (runner-up) game
const secondGameName = document.createElement("h3");
secondGameName.innerHTML = secondGame.name; // Set the name of the second most funded game
secondGameContainer.appendChild(secondGameName); // Append the name to the container