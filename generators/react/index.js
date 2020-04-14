"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const voca = require("voca");

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: "input",
        name: "componentName",
        message: "What is your component name?",
        default: this.appName // Default to current folder name
      },
      {
        type: "confirm",
        name: "isSure",
        message: answers =>
          `Your component's name will be '${voca.capitalize(
            voca.camelCase(answers.componentName)
          )}'`
      },
      {
        type: "confirm",
        name: "componentType",
        message: "*Yes: Functional, No: Class based?",
        default: true
      },
      {
        type: "confirm",
        name: "moreSettings",
        message: "Would u like to see more settings",
        default: false
      },
      {
        type: "confirm",
        name: "hasShouldComponentUpdate",
        message: "shouldComponentUpdate",
        when: ({ moreSettings, componentType }) =>
          !componentType && !!moreSettings,
        default: false
      },
      {
        type: "confirm",
        name: "hasComponentDidMount",
        message: "componentDidMount",
        when: ({ moreSettings, componentType }) =>
          !componentType && !!moreSettings,
        default: false
      },
      {
        type: "confirm",
        name: "hasComponentWillUnmount",
        message: "componentWillUnmount",
        when: ({ moreSettings, componentType }) =>
          !componentType && !!moreSettings,
        default: false
      },
      {
        type: "confirm",
        name: "hasUseEffect",
        message: "useEffect",
        when: ({ moreSettings, componentType }) =>
          componentType && !!moreSettings,
        default: false
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.props = {
        ...answers,
        componentName: voca.capitalize(voca.camelCase(answers.componentName))
      };
    });
  }

  writing() {
    const { componentName, componentType } = this.props;

    const sampleFileLocation = componentType
      ? "functional/sample.js"
      : "class-based/sample.js";

    this.fs.copyTpl(
      this.templatePath("index.js"),
      this.destinationPath(`${componentName}/index.js`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath(sampleFileLocation),
      this.destinationPath(`${componentName}/${componentName}.js`),
      this.props
    );
  }

  install() {
    //this.yarnInstall();
  }

  end() {
    this.log(yosay("Goog Bye " + this.description));
  }
};
