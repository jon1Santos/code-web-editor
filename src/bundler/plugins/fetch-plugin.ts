import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const indexDB = localForage.createInstance({
    name: 'upkg-path-plugin'
});

export const fetchPlugin = (userInput: string)=>{
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild){
            build.onLoad({ filter: /(^index\.js$)/ }, async (args: any) => {
                return {
                    loader: 'jsx',
                    contents: userInput,
                };
            });
            build.onLoad({ filter: /.*/}, async (args: any) =>{
                const cachedResult = await indexDB.getItem<esbuild.OnLoadResult>(args.path);

                if(cachedResult)
                    return cachedResult;
            });
            build.onLoad({ filter: /.css$/}, async (args: any) =>{
                const {data, request: {responseURL}} = await axios.get(args.path);
                console.log(data.replace(/\n/g, ''))
                const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
                const contents = `
                    const style = document.createElement('style'); 
                    style.innerText = '${escaped}'; 
                    document.head.appendChild(style);
                `
                const payload: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: contents,
                    resolveDir: new URL('./', responseURL).pathname
                };
                indexDB.setItem(args.path, payload)
                return payload;
            });
            build.onLoad({ filter: /.*/}, async (args: any) =>{
                const {data, request: {responseURL}} = await axios.get(args.path);
                console.log(responseURL);

                const payload: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL('./', responseURL).pathname
                };
                indexDB.setItem(args.path, payload)
                return payload;
            });
        }
    }
}