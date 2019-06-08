#!/usr/bin/env node

const shell = require("shelljs");
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");


// checkout front
const init = () => {
  console.log(
      chalk.red(
          figlet.textSync("Sadhan CLI", {
            font: "Standard",
            horizontalLayout: "default",
            verticalLayout: "default"
          })
      )
  );
}


const askQuestions = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message: "What is the name of the file without extension? (Filename:-)"
    },
    {
      type: "list",
      name: "EXTENSION",
      message: "What is the file extension?",
      choices: [".html", ".css", ".js", ".php"],
      filter: function(val) {
        return val.split(".")[1];
      }
    }
  ];
  return inquirer.prompt(questions);
};


// create file
const createFile = (filename, extension) => {

  const filePath = `${process.cwd()}/src/${filename}.${extension}`
  shell.touch(filePath);
  return filePath;
};


// show success message
const success = (filepath) => {
  console.log(
    chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
  );
};



// copy initial files
const initalTemplate = () => {

  const inputPath = `${process.cwd()}/boilerplate`
  const ouputPath = `${process.cwd()}/src`


  shell.cp('-R', inputPath, ouputPath);
  console.log(
      chalk.white.bgGreen.bold(`Template Initialized!`)
  );
};



const main = async () => {

  // gretting init time
  init();


  // ask questions
  const answers = await askQuestions();
  const { FILENAME, EXTENSION } = answers;

  console.log(FILENAME)
  console.log(EXTENSION)


   // create the file
  const filePath = createFile(FILENAME, EXTENSION);

  // copy file into src dir
  const initalTemplatePath = initalTemplate(FILENAME, EXTENSION);

  // show success message
  success(filePath);
};

main();