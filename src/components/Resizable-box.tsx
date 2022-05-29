import { ResizableBox, ResizableProps } from 'react-resizable';
import './Resizable-box.css';
import { useState, useEffect } from 'react';

interface ResizablePropsComponent{
    direction: 'horizontal' | 'vertical';
    children: JSX.Element;
}

const Resizable: React.FC<ResizablePropsComponent> = (props)=>{
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth * 0.75);

    let resizableProps: ResizableProps;

    useEffect(()=>{
        const listener = ()=>{
            setInnerWidth(window.innerWidth);
            setInnerHeight(window.innerHeight);

            if(window.innerWidth * 0.75 < width)
                setWidth(window.innerWidth * 0.75);
        }

        window.addEventListener('resize', listener)

        return ()=> window.removeEventListener('resize', listener)
    }, [width])

    if(props.direction === 'horizontal'){
        resizableProps = {
            className: 'resize-horizontal',
            maxConstraints:[innerWidth * 0.75, Infinity],
            minConstraints:[innerWidth * 0.2, Infinity],
            width: width,
            height: 200,
            resizeHandles:['e'],
        }    
    }else{
        resizableProps = {
            maxConstraints:[Infinity, innerHeight * 0.9 ],
            minConstraints:[Infinity, 50],
            width:Infinity,
            height:300,
            resizeHandles:['s'] ,
        }    
    }

    return (
        <ResizableBox {...resizableProps}>
            {props.children}
        </ResizableBox>
    );
};

export default Resizable;