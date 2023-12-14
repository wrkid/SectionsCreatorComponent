import './Constructor.scss';

import ConstructorRowEl from '../ConstructorRowEl/ConstructorRowEl';

const Constructor = ({ rows, handleSettingsMenu }) => {
    
    const rowEls = () => {
        const rowEls = [];
        for (let i = 0; i < rows; i++) {
            rowEls.push((
                <ConstructorRowEl key = {i} row={i} handleSettingsMenu={() => handleSettingsMenu()}/>
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