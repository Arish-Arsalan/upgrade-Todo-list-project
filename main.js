#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let conditions = true;
console.log(chalk.bold.rgb(204, 204, 204)(`\n \t\t <<<**************************************************>>>`));
console.log(chalk.bold.blue(`<<<*********>>>\tWelcome to Code with Arish - Todo-List Application\t<<<********>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<<<***********************************************>>>>\n`));
let main = async () => {
    while (true) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.greenBright("Select an option you want to do:"),
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo List", "Exit"],
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo List") {
            viewTask();
        }
        else if (option.choice === "Exit") {
            console.log("Exiting the program. Goodbye!");
            break;
        }
    }
};
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task:",
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.greenBright(`\n${newTask.task} task added successfully to Todo-list`));
};
let viewTask = () => {
    console.log("\n Your Todo-list: \n");
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
};
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellowBright("Enter the index number of the task you want to delete:"),
        }
    ]);
    let index = taskIndex.index;
    if (index >= 1 && index <= todoList.length) {
        let deletedTask = todoList.splice(index - 1, 1);
        console.log(chalk.greenBright(`\n${deletedTask} this task has been deleted successfully from your Todo_list`));
    }
    else {
        console.log(chalk.red("Invalid index! Please enter a valid index."));
    }
};
// Function to update a task
let updateTask = async () => {
    await viewTask();
    let updateTaskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellowBright("Enter the index number of the task you want to update:"),
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.yellowBright("Now enter the new task name:"),
        }
    ]);
    let index = updateTaskIndex.index;
    if (index >= 1 && index <= todoList.length) {
        todoList[index - 1] = updateTaskIndex.new_task;
        console.log(chalk.greenBright(`\nTask at index no. ${index} updated successfully [for updated list check option: "View Todo-list"]`));
    }
    else {
        console.log(chalk.red("Invalid index! Please enter a valid index."));
    }
};
main();
