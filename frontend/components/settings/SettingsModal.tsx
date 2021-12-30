import React, {
    FC, useState
} from 'react';
import Modal from '../multi/Modal';

interface SettingsModalProps {
    settingsModalVisible: boolean,
    setSettingsModalVisible: (b : boolean) => void,
    settings: string[]
}

const SettingsModal : FC<SettingsModalProps> = ({
    settings,
    setSettingsModalVisible,
    settingsModalVisible
} : SettingsModalProps) => {

    const [selectedSetting, setSelectedSetting] = useState<string>(settings ? settings[0] : '');

    return (
        <Modal 
        modalVisible={settingsModalVisible}
        setModalVisible={setSettingsModalVisible}>
            <div className="w-1/2 h-1/2 bg-zinc-50 rounded-xl flex flex-row justify-start items-center p-8 drop-shadow-lg"
            onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col justify-start items-start h-full">
                    {/* Settings Header */}
                    <div className="flex flex-row justify-start items-center mb-4">
                        <div className="text-slate-700 flex mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div className="text-4xl text-slate-900 font-medium ">
                            Settings
                        </div>
                    </div>
                   

                    {/* Different settings options */}
                    <div className="flex flex-col justify-start items-start space-y-4 w-full">
                        {settings.map(s => (
                            <SettingButton 
                                text={s}
                                selectedSetting={selectedSetting}
                                setSelectedSetting={setSelectedSetting}
                            />
                        ))}
                    </div>
                    

                </div>
            </div>
        </Modal>
    )
}

interface SBProps {
    text: string,
    selectedSetting: string,
    setSelectedSetting: (s : string) => void
}

const SettingButton : FC<SBProps> = ({
    text,
    selectedSetting,
    setSelectedSetting
} : SBProps) => {
    return (
        <div className={`${selectedSetting === text ? 'text-slate-800' : 'text-slate-600 '} duration-250 ease-in-out transition hover:drop-shadow-sm rounded-lg text-2xl font-medium w-full flex justify-start items-center cursor-pointer`}
        onClick={() => setSelectedSetting(text)}
        >
            {/* I could just have a div of w-11 with flex-center that just hides/unhides the chevron... whatever */}
            <div className="w-11 flex justify-center items-center">
                <div className={`${selectedSetting === text ? 'scale-100' : 'scale-0'} transition duration-400 ease-in-out`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-sky-400 h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
            {text}
        </div>
    )
}

export default SettingsModal;