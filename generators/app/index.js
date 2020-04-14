"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const voca = require("voca");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the classy ${chalk.red(
          "generator-furkanyilmazx"
        )} generator!`
      )
    );

    // networkName, appName, appNameForTokenHeader, appAuthor, appDescription, appNameUpperCamelCase

    const prompts = [
      {
        type: "input",
        name: "appName",
        message: "What is your project name?",
        default: this.appName, // Default to current folder name
      },
      {
        type: "input",
        name: "appDescription",
        message: "What is your project description?",
        default: function (answers) {
          return `The ${answers["appName"]} is restful api with express, sequelize and other libraries`;
        },
      },
      {
        type: "input",
        name: "appAuthor",
        message: "Who is application author?",
      },
      {
        type: "input",
        name: "appNameUpperCamelCase",
        message: "Your webpack import alias",
        default: function (answers) {
          const camelCaseAppName = voca.camelCase(answers["appName"]);
          const upperCamelCaseAppName = voca.capitalize(camelCaseAppName);
          return upperCamelCaseAppName;
        },
      },
      {
        type: "input",
        name: "networkName",
        message: "Your docker network name",
        default: function (answers) {
          const kebabCaseNetworkName = voca.kebabCase(answers["appName"]);
          return kebabCaseNetworkName;
        },
      },
      {
        type: "input",
        name: "appNameForTokenHeader",
        message: "Your token name in http header",
        default: function (answers) {
          return answers["networkName"];
        },
      },
      {
        type: "input",
        name: "appDefaultPort",
        message: "Api default port is: ",
        default: 8080,
      },
      {
        type: "confirm",
        name: "isDatabaseActive",
        message: "Do you want use database?",
        default: false,
      },
      {
        type: "confirm",
        name: "isSslActive",
        message: "Do you want use secure connection (SSL)?",
        default: false,
      },
      {
        type: "confirm",
        name: "isJwtActive",
        message: "Do you want use jwt (JWT)?",
        default: false,
      },
      {
        type: "expand",
        name: "jwtType",
        message: "Do you want use jwt (JWT)?",
        when: ({ isJwtActive }) => !!isJwtActive,
        choices: [
          {
            key: "s",
            name: "SHA256",
            value: "sha256",
          },
          {
            key: "r",
            name: "RSA256",
            value: "rsa256",
          },
        ],
      },
    ];

    return this.prompt(prompts).then((answers) => {
      // To access props later use this.props.someAnswer;
      this.props = {
        ...answers,
        appPackageJsonName: voca.kebabCase(answers["appName"]),
      };
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("**"),
      this.destinationPath(),
      this.props,
      undefined,
      {
        globOptions: {
          dot: true,
        },
      }
    );
  }

  install() {
    this.yarnInstall();
  }

  end() {
    this.log("Creating git repository");
    this.spawnCommandSync('git', ['init']);
    this.spawnCommandSync('git', ['add', '--all']);
    this.spawnCommandSync('git', ['commit', '-m', '"initial commit from generator"']);
    this.log(yosay("Don't remember to set .env file (e.g. `mv default-env .env`)"));
  }
};
