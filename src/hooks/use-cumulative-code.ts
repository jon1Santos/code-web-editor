import { useTypedSelector } from './use-typed-selector';

//YOU CAN WRITE A NEW FUNCTION, AND ATTACH IT INTO A NEW CONST LIKE BELOW
const showFunc = 
`
    import _React from 'react';
    import _ReactDOM from 'react-dom';
    var show = (value) => {
        const root = document.querySelector('#root');

        if(typeof value === 'object'){
            if(value.$$typeof && value.props){
                _ReactDOM.render(value, root);
            }else{
                root.innerHTML = JSON.stringify(value);
            };
        }else{
            root.innerHTML = value;
        };
    };
`

//YOU WILL NEED TO CREATE A GENERIC FORM OF YOUR NEW FUNCTION LIKE BELOW
const showFuncNoop = 'var show = () => {}';

export const useCumulativeCode = (cellId: string) => {

   return useTypedSelector(state => {
        if(typeof state.cells !== 'undefined'){
            const { data, order } = state.cells;
            const orderedCells = order.map(id => data[id]);

            const cumulativeCode = [];

            for(const c of orderedCells){
                if(c.id === cellId){
                    cumulativeCode.push(showFunc);  // YOU HAVE TO ADD A NEW LINE AND PUSH YOUR NEW FUNCTION INTO THE CUMULATIVE CODE
                    if(c.content === ''){
                        while(cumulativeCode.length !== 0)
                            cumulativeCode.pop();
                        cumulativeCode.push(c.content);
                        cumulativeCode.push(showFunc);  // YOU HAVE TO ADD A NEW LINE AND PUSH YOUR NEW FUNCTION INTO THE CUMULATIVE CODE RIGHT HERE TOO
                        break;
                    }
                }else{
                    cumulativeCode.push(showFuncNoop); // YOU HAVE TO ADD A NEW LINE AND PUSH YOU NEW GENERIC FUNCTION RIGHT HERE
                }
                cumulativeCode.push(c.content);

                if(c.id === cellId){
                    break;
                }
            }
            
            return cumulativeCode.join('\n');
        }
    });
};
