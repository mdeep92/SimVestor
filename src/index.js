"use strict";
// Entry point for Simvestor game app
console.log('Hello, Simvestor!');
// Player class to represent each player
class Player {
    constructor(name, startingBalance = 1000) {
        this.name = name;
        this.balance = startingBalance;
    }
    invest(amount) {
        if (amount > this.balance) {
            console.log(`${this.name} does not have enough balance to invest.`);
            return false;
        }
        this.balance -= amount;
        console.log(`${this.name} invested $${amount}. Remaining balance: $${this.balance}`);
        return true;
    }
    receive(amount) {
        this.balance += amount;
        console.log(`${this.name} received $${amount}. New balance: $${this.balance}`);
    }
}
// Game class to manage the game state
class Game {
    constructor(playerNames) {
        this.players = playerNames.map(name => new Player(name));
        this.round = 1;
    }
    start() {
        console.log('Game started!');
        this.nextRound();
    }
    nextRound() {
        console.log(`\n--- Round ${this.round} ---`);
        this.players.forEach(player => {
            // Example: Each player invests a random amount
            const investAmount = Math.floor(Math.random() * 200) + 1;
            player.invest(investAmount);
        });
        this.round++;
        // Add more game logic here (e.g., simulate returns, check win conditions)
    }
}
// Example usage
const game = new Game(['Alice', 'Bob']);
game.start();
// To continue the game, call game.nextRound() as needed.
