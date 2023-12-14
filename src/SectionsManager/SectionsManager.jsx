import React, { useEffect, useState } from "react";

import "./SectionsManager.scss";

import { PlusCircleOutlined, MinusOutlined } from '@ant-design/icons'
import Constructor from "../Constructor/Constructor";
import SettingsMenu from "../SettingsMenu/SettingsMenu";

import { SectionsManagerContext } from './SectionsManagerContext';

const SectionsManager = () => {
    
    const [ rows, setRows] = useState(1);

    const [ settingstMenuOpened, setSettingsMenuOpened ] = useState(false);

    const [ curId, setCurId ] = useState(null);

    const [ layoutDate, setLayoutDate ] = useState({
        1: [{i: 11, x: 0, y: 0, w: 1, h: 1}]
    });

    const [ name, setName ] = useState('');


    useEffect(() => {
        // const childrenLayout = Object.values(layoutDate).map(el => el);
        //console.log(layoutDate)
        sectionData();
    }, [layoutDate])

    // ------------ Вывод нужынх данных
    const sectionData = () => {
        const arr = [];
        const data = Object.values(layoutDate);
        for (let i = 0; i < data.length; i++) {
            arr.push(...data[i]);
        }
        const filteredArr = arr.filter(el => el.name)
        const elements = filteredArr.map(el => ({
            name: el.name,
            layout: {
                i: el.i,
                x: el.x,
                y: el.y,
                w: el.w,
                h: el.h
            }
        }))
        const section = {
            name,
            children: elements
        }
        console.log(section)
    }

    const handleSettingsMenu = (id) => {
        if (id) {
            setCurId(id)
            setSettingsMenuOpened(true);
        } else {
            setSettingsMenuOpened(prev => !prev);
        }
    };

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleElementName = (name, r, w) => {
        const id = String(r) + w;
        const prevRow = JSON.parse(JSON.stringify(layoutDate[r]));
        const idxInRow = prevRow.findIndex((el) => { return String(el.i) === id });
        prevRow[idxInRow].name = name.label;
        const newRow = [...prevRow]
        console.log('=====id: ', id, newRow)
        setLayoutDate(layoutDate => ({...layoutDate, [r]: newRow}));
    };

    // Row 
    const addRow = () => {
        if (rows < 5) {
            setRows(prev => prev + 1);
            const id = String(rows + 1) + 1;
            setLayoutDate(layout => {
                return ({...layout, [rows+1]: [{i: id, x: 0, y: rows, w: 1, h: 1}]})
            })
        }
    }

    const removeRow = () => {
        if (rows > 1) {
            setRows(prev => prev - 1);
            const newLayoutDate = JSON.parse(JSON.stringify(layoutDate));
            delete newLayoutDate[rows]
            setLayoutDate(newLayoutDate)
        }
    }

    const editRowDate = (row, date) => {
        setLayoutDate(layoutDate => ({...layoutDate, [row]: date}))
    }
    //=====================================


    return (
        <SectionsManagerContext.Provider value={{layoutDate, handleSettingsMenu, editRowDate, handleElementName}}>
            <div className="manager-container">
                <div className="manager-container__tools-menu">
                    <span className="manager-container__tools-menu__title">Tools bar</span>
                    <label 
                        className="manager-container__tools-menu__btn"
                        onClick={() => addRow()}>
                        <PlusCircleOutlined />
                        <span>Add row</span>
                    </label>
                    <label 
                        className="manager-container__tools-menu__btn"
                        onClick={() => removeRow()}>
                        <MinusOutlined />
                        <span>Remove</span>
                    </label>
                    {settingstMenuOpened ? <SettingsMenu id={curId}/> : null}
                </div>
                <div className="manager-container__workspace">
                    <input 
                        className="manager-container__workspace__title-input" 
                        onChange={(e) => handleName(e)}
                        value={name}
                        placeholder="Section Name">  
                    </input>
                    <Constructor  rows={rows}/>
                    <button className="">Save section</button>
                </div>
            </div>
        </SectionsManagerContext.Provider>
    );
};


export default SectionsManager;