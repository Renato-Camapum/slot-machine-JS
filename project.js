//1. Deposit money
//2.determine number of line to bet
//3. collect bet
//4.spin
//5.check
//6. give the money
//7.play again

const prompt = require('prompt-sync')(); //The prompt-sync module is a function that creates prompting functions, so you need to call prompt-sync in order to get your actual prompting function.

const ROWS = 3;
const COLS = 3;


//how many times each symbol will appear - OOP
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

//the values of each symbol if wins - OOP
const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}


const deposit = () => {
    while(true) {
        const depositAmount = prompt('Enter a deposit amount: ');
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log('Invalid amount. Try again')
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    const lines = prompt('Enter the number of lines to bet on (1-3): ');
    const numberOfLines = parseFloat(lines);
    

    if (isNaN(numberOfLines) || numberOfLines > 3 || numberOfLines < 1) {
        console.log('Invalid number of lines. Try again')
    } else {
        return numberOfLines;
    }
};

const getBet = (balance, lines) => {
    const bet = prompt('Enter the total bet per line: ');
    const numberBet = parseFloat(bet);
    

    if (isNaN(numberBet) || numberBet > (balance / lines) || numberBet <= 0) {
        console.log('Invalid bets. Try again')
    } else {
        return numberBet;
    }
};

const spin = () => {
    const symbols = [];
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for(let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]); //insert the number of arrays according to the number of columns
        const reelSymbols = [...symbols]; //copy the symbols array
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol); //insert the index in the array
            reelSymbols.splice(randomIndex, 1); //remove the index number of the array
        }
    }

    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = '';
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += ' | ';
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols)  {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }

    return winnings;
};

const game = () => {
    let balance = deposit();

    while (true) {
        console.log('You have a balance of $' + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log('You won, $' + winnings.toString());

        if (balance <= 0) {
            console.log('No credits');
            break;
        }

        const playAgain = prompt('Do you want to play again (y/n)? ')
        if (playAgain != 'y') break;
    } 
};

game();



