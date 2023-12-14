import { CloseOutlined } from '@ant-design/icons';
import './SettingsMenu.scss';

import { SectionsManagerContext } from '../SectionsManager/SectionsManagerContext';
import { useContext } from 'react';

import { Select } from 'antd';

const SettingsMenu = ({ id }) => {
    const [r, w] = String(id).split('');

    const { handleSettingsMenu, handleElementName } = useContext(SectionsManagerContext);

    return (
        <div className='settings-menu'>
            <div className='settings-menu__title'>
                {`| r:${r} | w:${w} |`}
                <CloseOutlined 
                    style={{fontSize: '20px', cursor: 'pointer'}}
                    onClick={() => handleSettingsMenu()}/>
            </div>
            <div className='settings-menu__content'>
                Choose element:
                <Select
                    labelInValue
                    defaultValue={{ value: 'lucy', label: 'BasicTitle' }}
                    style={{ width: 120 }}
                    onChange={(label) => handleElementName(label, r, w)}
                    options={[
                    {
                        value: 'Basic Title',
                        label: 'BasicTitle',
                    },
                    {
                        value: 'Basic Image',
                        label: 'BasicImage',
                    },
                    {
                        value: 'Basic Button',
                        label: 'BasicButton',
                    },
                    ]}
                />
            </div>
        </div>
    );
};

export default SettingsMenu;