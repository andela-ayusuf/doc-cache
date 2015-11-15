# Doc-Cache 

This is an app which allows users to manage text documents online. Doc-Cache -built with the MEAN stack- is free and will always be :)

# Before You Begin
Make sure you have installed all these prerequisites on your development machine.
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the node package manager.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

```
$ npm install -g bower
```

* Gulp - You're going to use the [Gulp Task Runner](http://gulpjs.com/) to automate your development process, in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:

```
$ npm install -g gulp
```

### Cloning The GitHub Repository
You can use Git to directly clone the Doc-Cache repository: 
```
$ git clone https://github.com/andela-ayusuf/doc-cache.git
```
This will clone the latest version of the Doc-Cache repository to a **Doc-Cache** folder.

## Quick Install
Once you've cloned the repository and installed all the prerequisites, the next thing is to install the Node.js dependencies. The project comes with a package.json file that contains the list of modules you need to start your application, to learn more about the modules installed visit the NPM & Package.json section.

To install Node.js dependencies you're going to use npm again, in the application folder run this in the command-line:

```
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* Finally, when the install process is over, npm will initiate a bower-install command to install all the front-end modules needed for the application

## Running Your Application
After the install process is over, you'll be able to run your application using Grunt, just run grunt default task:

```
$ gulp
```

Your application should run on the 5000 port so in your browser just go to [http://localhost:5000](http://localhost:5000)
                            
And BANG! you're up and running.

# Contributing

Doc-Cache is a continous project. Hence, contributions are always welcome. If You would like to make improvements to Doc-Cache, look through the [the open issues](https://github.com/andela-ayusuf/doc-cache/issues) and help where you can.

Best regards :)
