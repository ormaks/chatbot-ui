# Chatbot UI
Here you can see the general frontend view of chatbot, that is connected with server and 
work with DialogFlow.

[See a demo](https://ormaks.github.io/chatbot-ui/public/index.html)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
See deployment for notes on how to deploy the project on a live system.

### Installation and quick start

Please download the project or clone it with a command in terminal:
```
git clone https://github.com/ormaks/chatbot-ui.git
```
When you successful downloaded a project, open a terminal in folder with project and write the following commands:
```
npm i
gulp
```
This will open browser tab with a project.

Also, you can see this in device that connected in the same wifi network. Open a browser and enter an external url that you can see in the terminal.

If you just want to look at the site, just open the index.html file in the folder public

Here is command to create deployment version of project:
```
gulp run build
```

### Project structure

Project has two environments.
1) Deploying environment
2) Working environment

1 - First variant use for deploying the project to public space. You can find it in public folder.

It include minification and compress code, libraries and others, optimizing images, fonts, css. 
All code, files other features are merged.


2 - The second one using to developing. You can find it in src folder.

There are structure of files in different components, folders to increase productivity,
 structure clarity, convenience, and reuse of elements.

## Built With

* [NPM](https://www.npmjs.com/) - The package manager for JavaScript
* [Gulp](https://gulpjs.com/) - A toolkit for automating painful or time-consuming tasks
* [Browsersync](https://www.browsersync.io/) -  A module for Node.js, a platform for fast network applications
* [SCSS](https://sass-lang.com/) - Pre-Processor for css
* Font Awesome - Icons
* Jquery - Javascript library
