# code-web-editor

![image](https://user-images.githubusercontent.com/42220755/169667610-f82c6135-61e2-4406-8478-0b95bb692db8.png)

## Save to a local file

* This application was uploaded on npm
* So you can save the state of the application to a local file, uploading the app to a local server
<pre>npx code-web-editor serve</pre>
* You can pass some arguments, like ``-p`` to set the server port or the ``filename`` that you want to save the application state
<pre>npx code-web-editor serve -p 5000 mySavedState.js</pre>

## Features

* Bundling-code: esbuild-wasm
* CSS Templates: bulmaswatch
* Code Editor: monaco-editor
* State Manipulation Control: immer
* Online Unpacker: https://unpkg.com/

## About the App

You can use this app for test some features of libraries that you want to implement into your application or test some codes that you want to show someone,
note, you can't use all libraries that you want, some libraries might not work here.
I created this application with Stephen Grider into his course and i left some features off and implemented some updates to the libraries that were
used here, like the ``monaco``, ``react-resizable`` for instance, and i made some implementations into the source code and on the ``css`` side
