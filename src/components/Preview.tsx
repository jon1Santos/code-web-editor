import { useEffect, useRef } from 'react';
import './Preview.css';

interface PreviewProps{
    code: string;
    err: string;
}

const Preview: React.FC<PreviewProps> = ({ code, err })=>{
    const iframe = useRef<any>();
    const iframeWall = useRef<any>();
    
    useEffect(()=>{
        iframeWall.current.classList.remove('hide-iframe')
        iframe.current.srcdoc = html;
        setTimeout(()=>{
            iframe.current.contentWindow.postMessage(!err ? code : err, '*');
        }
        ,50);
        setTimeout(()=>{

            iframeWall.current.classList.add('hide-iframe')
        }, 50)
    },[code, err])

    return (
        <div className="preview-wrapper">
            <div className="hide-iframe" ref={iframeWall} style={{position: 'absolute', width: '100%', height: '100%', background: 'white', bottom: '0.1%'}}></div>
            <iframe title="iframePreview" ref={iframe} sandbox="allow-scripts" />
        </div>
    )
};


const html = `
<html>
    <head>
        <style>html{ background: white; }</style>
    </head>
    <body>
        <div id="root"></div>
        <script>
        
            const root = document.querySelector('#root')
            const handleError = (err) =>{
                root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                console.error(err);
            }
            const handleBuildError = (err) => {
                root.innerHTML = '<div style="color: red;"><h4>' + err + '</h4></div>'
            }

            window.addEventListener('error', (event)=>{
                event.preventDefault();
                handleError(event.error);
            })

            window.addEventListener('message', (e)=>{
                
                if(e.data.match(/(Build failed with 1 error)/)){
                    handleBuildError(e.data);
                }else{
                    try{
                        root.innerHTML = '';
                        eval(e.data);
                    }catch(err){
                        handleError(err);
                    }
                }
            
            }, false);
        </script>
    </body>
</html>
`;

export default Preview;