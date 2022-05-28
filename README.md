# code-web-editor

[<img height="50px" src="https://media0.giphy.com/media/5ABGt7KDXJ62zg7oI0/giphy.gif?cid=790b761123aba84c737efe59273d3d75b3dbaef458bf13a4&rid=giphy.gif&ct=s" />](https://code-web-editor.vercel.app/)



![image](https://user-images.githubusercontent.com/42220755/169667610-f82c6135-61e2-4406-8478-0b95bb692db8.png)

## Save to a local file

* This application was uploaded on npm -> https://www.npmjs.com/package/code-web-editor
* So you can save the state of the application to a local file, uploading the app to a local server
```
npx code-web-editor serve
```
* You can pass some arguments, like ``-p`` to set the server port or the ``filename`` that you want to save the application state

```
npx code-web-editor serve -p 5000 mySavedState.js
```

### To implement a new function before app be render

* You can see the comments of the `use-cumulative-code` into the `hooks` folder

## Features

* Bundling-code: esbuild-wasm
* CSS Templates: bulmaswatch
* Code Editor: monaco-editor
* State Manipulation Control: immer
* Online Unpacker: https://unpkg.com/

<br/>

<dl>
  <dt><h2>About the App</h2></dt>
  <dd>You can use this app for test some features of libraries that you want to implement into your application or test some codes that you want to show someone,
  note, you can't use all libraries that you want, some libraries might not work here.
  <br/>
  I created this application with Stephen Grider into his course and i left some features off and implemented some updates to the libraries that were
  used here, like the <code>monaco</code>, <code>react-resizable</code> for instance, and i made some implementations into the source code and on the            <code>css</code> side.</dd>
</dl>
