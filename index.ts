#! /usr/bin/env node

import inquirer from "inquirer";
//Character health here because character health shouldn't be updated if main function is called.
let characterHealth: number = 100;
let healthDrinks: number = 3;
console.log("WELCOME TO DUNGEON!!!");
function main() {
    let enemies = ["Skeleton", "Zoombie", "Warrrior", "Assassin"];
    console.log("________________________________________________________________");
    let randomNum = Math.floor(Math.random() * 4);
    console.log(enemies[randomNum] + " has appeared.");
    let enemyHealth: number = Math.ceil(Math.random() * 100);
    async function Menu() {
        console.log("Your HP: " + characterHealth);
        console.log(enemies[randomNum] + " HP: " + enemyHealth);
        console.log("Health Potions left: " + healthDrinks);
        let menuCh = await inquirer
            .prompt([
                {
                    type: "list",
                    name: "choice",
                    message: "Select the operation from below",
                    choices: ["Attack", "Drink health potion", "Run!"],
                },
            ]).then(async (answers) => {
                if (answers.choice == "Attack") {
                    console.log("attack");
                    let damageDealt: number = Math.ceil(Math.random() * 30);
                    let damageTaken: number = Math.ceil(Math.random() * 30);
                    characterHealth = characterHealth - damageTaken;
                    enemyHealth = enemyHealth - damageDealt;
                    if (characterHealth > 1 && enemyHealth > 1) {
                        Menu();
                    }
                    else if (enemyHealth < 1) {
                        console.log("You have defeated " + enemies[randomNum]);
                        characterHealth = 10;//Just for giving chance
                        await inquirer
                            .prompt([
                                {
                                    type: "list",
                                    name: "innerChoice",
                                    message: "What do you want to do?",
                                    choices: ["Continue Fight", "Exit"],
                                },
                            ]).then(async (answers) => {
                                if (answers.innerChoice == "Continue Fight") {
                                    main();
                                }
                                else {
                                    close();
                                }
                            })
                    }
                    else if (characterHealth < 1 && healthDrinks == 0) {
                        console.log("You are too weak for battle and no drinks left");
                    }
                    else if (characterHealth < 1 && healthDrinks > 0) {
                        console.log("Drink taken automatically");
                        characterHealth += 30;
                        healthDrinks += -1;
                        Menu();
                    }
                }



                else if (answers.choice == "Drink health potion") {
                    characterHealth += 30;
                    healthDrinks += -1;
                    Menu();

                }
                else if (answers.choice == "Run!") {
                    main();

                }
                else {
                    console.log("Won't come here");
                }
            })
    }
    Menu()
}
main();
function close() {
    console.log("Thanks for playing game")
}
