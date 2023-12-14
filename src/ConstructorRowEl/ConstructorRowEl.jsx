import './ConstructorRowEl.scss';

import { PlusCircleOutlined, MinusCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';

import { SectionsManagerContext } from '../SectionsManager/SectionsManagerContext';

const ConstructorRowEl = ({ row }) => {

    const { layoutDate, handleSettingsMenu, editRowDate, removeRowDate } = useContext(SectionsManagerContext);

    const [ columns, setColumns ] = useState(1);

    const idGen = (r, c) => {
        return String(r) + String(c);
    }

    const [ layout, setLayout ] = useState({
        1: {i: idGen(row + 1, 1),x: columns - 1, y: row, w: 1, h: 1},
    })

    const [ gridLayoutStyle, setGridLayoutStyle ] = useState({gridTemplateColumns: '1fr', gridTemplateRows: '1fr'});


    useEffect(() => {
        const gridStyle = {gridTemplateColumns: Object.values(layout).map(el => {
            if(el.w) {
                return String(el.w) + 'fr';
            } else {
                return '';
            }
        }).join(' ')};
        setGridLayoutStyle(gridStyle);
        editRowDate(row + 1, Object.values(layout).filter(el => el.i))
        return () => {
            removeRowDate(row + 1)
        }               
    }, [columns, layout])

    const handleLayoutX = (e, i) => {
        setLayout(layout => {
            const newValue = {...layout[i], w: Number(e.target.value)}
            return ({...layout, [i]: newValue})
        })
    }

    const handleLayoutY = (e, i) => {
        setLayout(layout => {
            const newValue = {...layout[i], h: Number(e.target.value)}
            return ({...layout, [i]: newValue})
        })
    }

    const renderColumns = () => {
        let columnsEl = [];
        const r = String(row + 1);
        for (let i = 1; i <= columns; i ++) {
            let name = '';
            try {
                name = layoutDate[r][i - 1]?.name
            } catch {
                name = '';
            }
            columnsEl.push((
                <div key = {i} className="constructor-container__row__el__section">
                    <SettingOutlined 
                        style={{marginLeft: '15px', marginTop: '15px', fontSize: '20px'}}
                        onClick={() => handleSettingsMenu(r + i)}/>
                    <div className='constructor-container__row__el__section__name'>{name}</div>
                    <div className='constructor-container__row__el__section__inputs'>
                        <label>
                        x:
                            <input 
                                className='constructor-container__row__el__section__input' 
                                value={`${layout[i].w}`}
                                onChange={(e) => handleLayoutX(e, i)}>    
                            </input>
                        </label>
                        <label>
                        y:
                            <input 
                                className='constructor-container__row__el__section__input' 
                                value={`${layout[i].h}`}
                                onChange={(e) => handleLayoutY(e, i)}>    
                            </input>
                        </label>
                    </div>
                </div>
            ))
        }
        return columnsEl;
    }

    const addColumn = () => {
        if (columns < 3) {
            setColumns(prev => prev + 1)
            const newValue = {i: idGen(row + 1, columns + 1),x: columns, y: row, w: 1, h: 1};
            setLayout({...layout, [columns+1]: newValue})   
        }
    }

    const removeColumn = () => {
        if (columns > 1) {
            setColumns(prev => prev - 1)
            setLayout({...layout, [columns]: ''})  
        } 
    }

    return (
        <div className='constructor-container__row'>
            <PlusCircleOutlined 
                        style={{alignSelf: 'center', fontSize: '30px', cursor: 'pointer'}}
                        onClick={() => addColumn()}/>
            <MinusCircleOutlined 
                style={{alignSelf: 'center', fontSize: '30px', cursor: 'pointer', marginLeft: '5px'}}
                onClick={() => removeColumn()}/>
            <div className="constructor-container__row__el" style={gridLayoutStyle}>
                {renderColumns()}
            </div>
        </div>
    );
}

export default ConstructorRowEl;