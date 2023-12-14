import './Constructor.scss';

import ConstructorRowEl from '../ConstructorRowEl/ConstructorRowEl';

const Constructor = ({ rows }) => {
    
    const rowEls = () => {
        const rowEls = [];
        for (let i = 1; i <= rows; i++) {
            rowEls.push((
                <ConstructorRowEl key = {i} row={i}/>
            ))
        } 
        return rowEls;
    }

    return (
        <div className="constructor-container">
            {rowEls()}
        </div>
    );
}

export default Constructor;