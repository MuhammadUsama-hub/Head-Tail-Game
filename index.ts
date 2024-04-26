#! /usr/bin/env node
import inquirer from "inquirer";
function toss(coin: number) {
  const toss: number = Math.floor(Math.random() * 2);
  return new Promise((res, rej) => {
    if (coin === toss) {
      res(true);
    } else {
      rej(false);
    }
  })
    .then((value) => value)
    .catch((value) => value);
}
function gameModes(modes: string): number {
  //Wickets Selection
  let wickets = 0;
  switch (modes) {
    case "2 Wickets Each": {
      wickets = 2;
      break;
    }
    case "3 Wickets Each": {
      wickets = 3;
      break;
    }
  }
  return wickets;
}

async function play(wickets: number, opNames: string, name: string) {
  //start game and make runs
  const runs: number[] = [1, 2, 3, 4, 5, 6];
  let scores: number = 0;
  let counter: number = 1;
  while (counter <= wickets) {
    const shot = await inquirer.prompt({
      message: "Hit shot Between 1 to 6 :",
      type: "number",
      name: "playerRuns",
    });
    if (runs.includes(shot.playerRuns)) {
      if (shot.playerRuns !== Math.floor(Math.random() * 7)) {
        scores += shot.playerRuns;
        console.log("Shot Successful!");
      } else {
        console.log(`YOur are Out & ${wickets - counter} left only`);
        counter++;
      }
    } else {
      console.log("shot Gone Wate ! Try again...");
    }
  }
  if (name === "System") {
    //output condition.
    console.log(
      `${name} Scored : ${scores} \n***${opNames} Needs ${scores} Runs To Win!***`
    );
    scoreChase(wickets,name,scores,opNames)
  } else {
    console.log(
      `${name} Scored : ${scores} \n*** System Needs ${scores} Runs To Win!***`
    );
    scoreChase(wickets,name,scores,opNames)
  }
}
async function scoreChase(wickets:number , name :string, target:number ,opNames:string) {
  //score chase function
  const runs: number[] = [1, 2, 3, 4, 5, 6];
  let scores: number = 0;
  let counter: number = 1;
  while (counter <= wickets && scores < target) {
    const shot = await inquirer.prompt({
      message: "Hit shot Between 1 to 6 :",
      type: "number",
      name: "playerRuns",
    });
    if (runs.includes(shot.playerRuns)) {
      if (shot.playerRuns !== Math.floor(Math.random() * 7)) {
        scores += shot.playerRuns;
        console.log("Shot Successful!");
      } else {
        console.log(`YOur are Out & ${Math.abs(wickets - counter)} left only`);
        counter++;
      }
    } else {
      console.log("shot Gone Wate ! Try again...");
    }
  }
  
  if(name === 'System' ){
    if(scores >= target)
    {
      console.log(`***${opNames} WOn the Game by ${wickets - counter +1} Wickets! ***`)
      
    }
    else{
      console.log(`***${name} WOn the Game by ${target-scores } runs! ***`)
    }
  }else{
  
    if(scores >= target)
    {
      console.log(`***System WOn the Game by ${wickets - counter +1} Wickets! ***`)
    }
    else{
      console.log(`***${name} WOn the Game by ${target-scores } runs! ***`)
    }
  }
}
async function gameToss(flipCoin: number) {
  // main function
  const result = await toss(flipCoin);
  let opponentName = await inquirer.prompt({
    message: "Your Name : ",
    type: "input",
    name: "playerName",
  });
  let name: string;
  //Toss decision and game Starting...
  if (result) {
    console.log("YOu Won The Toss ! It's Your Turn.\n");
    name = opponentName.playerName;
  } else {
    console.log("YOu Lose The Toss ! It's System Turn.\n");
    name = "System";
  }
  const modesSelection = await inquirer.prompt({
    message: "Select Game Mode : ",
    type: "list",
    name: "modes",
    choices: ["2 Wickets Each", "3 Wickets Each"],
  });
  play(gameModes(modesSelection.modes), opponentName.playerName, name);
}
// user entered number for toss decision
while (true) {
  const tossDecision = await inquirer.prompt([
    {
      message: "Enter Either 0 or 1 To Toss Decision :",
      type: "number",
      name: "guessDigit",
    },
  ]);
  // Toss input range validation
  if (tossDecision.guessDigit === 1 || tossDecision.guessDigit === 0) {
    gameToss(tossDecision.guessDigit);
    break;
  } else {
    console.log("Invalid Input!");
  }
}

