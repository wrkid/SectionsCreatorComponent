import './ConstructorRowEl.scss';

import { PlusCircleOutlined, MinusCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';

import { SectionsManagerContext } from '../SectionsManager/SectionsManagerContext';

const ConstructorRowEl = ({ row }) => {

    const { layoutDate, handleSettingsMenu, editRowDate } = useContext(SectionsManagerContext);

    const [ gridLayoutStyle, setGridLayoutStyle ] = useState({gridTemplateColumns: '1fr', gridTemplateRows: '1fr'});

    const [ columns, setColumns ] = useState(1);

    const [ layoutRow, setLayoutRow ] = useState(layoutDate[row]);

    useEffect(() => {
        editRowDate(row, layoutRow);
        gridLayoutStyled();
    }, [layoutRow])

    const gridLayoutStyled = () => {
        const v = layoutRow.map(v => v.w + 'fr').join(' ');
        const style = {gridTemplateColumns: v};
        setGridLayoutStyle(style);
    }

    const addColumn = () => {
        if (columns < 3) {
            setColumns(prev => prev + 1)
            const id = Number(String(row) + (columns + 1));
            // задать правильно x y w и h? 
            const newValue = {i: id, x: columns, y: row - 1, w: 1, h: 1};
            setLayoutRow([...layoutRow, newValue])   
        }
    }

    const removeColumn = () => {
        if (columns > 1) {
            setColumns(prev => prev - 1)
            const newSectionValue = JSON.parse(JSON.stringify(layoutRow));
            const row = newSectionValue.slice(0, columns - 1)
            setLayoutRow(row)  
        } 
    }   

    const handleLayoutX = (e, i) => {
        const value = e.target.value;
        const newRowDate = JSON.parse(JSON.stringify(layoutRow));
        newRowDate[i].w = Number(value);
        setLayoutRow(newRowDate);
    }

    const handleLayoutY = (e, i) => {
        const value = e.target.value;
        const newRowDate = JSON.parse(JSON.stringify(layoutRow));
        newRowDate[i].h = Number(value);
        setLayoutRow(newRowDate);
    }

    const renderColumns = () => {
        let columnsEl = [];
        let name = '';
        const r = String(row);
        for (let i = 1; i <= columns; i ++) {
            try {
                name = layoutDate[r][i - 1].name;
            } catch {
                name = '';
            }
            columnsEl.push((
                <div key = {i} className="constructor-container__row__el__section">
                    <SettingOutlined 
                        style={{marginLeft: '15px', marginTop: '15px', fontSize: '20px'}}
                        onClick={() => handleSettingsMenu(r + i)}
                    />
                    <div className='constructor-container__row__el__section__name'>{name}</div>
                    <div className='constructor-container__row__el__section__inputs'>
                        <label>
                        x:
                            <input 
                                className='constructor-container__row__el__section__input' 
                                value={`${layoutRow[i-1].w}`}
                                onChange={(e) => handleLayoutX(e, i - 1)}
                            >    
                            </input>
                        </label>
                        <label>
                        y:
                            <input 
                                className='constructor-container__row__el__section__input' 
                                value={`${layoutRow[i-1].h}`}
                                onChange={(e) => handleLayoutY(e, i - 1)}
                            >    
                            </input>
                        </label>
                    </div>
                </div>
            ))
        }
        return columnsEl;
    }

    return (
        <div className='constructor-container__row'>
            <PlusCircleOutlined 
                style={{alignSelf: 'center', fontSize: '30px', cursor: 'pointer'}}
                onClick={() => addColumn()}
            />
            <MinusCircleOutlined 
                style={{alignSelf: 'center', fontSize: '30px', cursor: 'pointer', marginLeft: '5px'}}
                onClick={() => removeColumn()}
                />
            <div className="constructor-container__row__el" style={gridLayoutStyle}>
                {renderColumns()}
            </div>
        </div>
    );
}

export default ConstructorRowEl;