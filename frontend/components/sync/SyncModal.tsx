import React, {
    FC, ReactNode, useState
} from 'react';
import Modal from '../multi/Modal';

interface SyncModalProps {
    syncModalVisible: boolean,
    setSyncModalVisible: (b : boolean) => void,
    trySync: (u : string, p : string) => Promise<void>
}

const SyncModal : FC<SyncModalProps> = ({
    syncModalVisible,
    setSyncModalVisible,
    trySync
} : SyncModalProps) => {

    const [uscUsername, setUscUsername] = useState<string>('')
    const [uscPassword, setUscPassword] = useState<string>('');

    const [wa, setWa] = useState<number>(0)

    const syncSubmitted = async () => {
        try {
            setWa(wa + 1)
            await trySync(uscUsername, uscPassword)
        }
        catch (err : any) {
            console.error(`Error in trySync: ${err.code}`)
        }
    }


    return (
        <Modal 
        modalVisible={syncModalVisible}
        setModalVisible={setSyncModalVisible}>
            <div className="p-2  w-96 h-auto bg-zinc-50 rounded-xl drop-shadow-lg bg-gradient-to-br from-pink-500 to-red-500"
            onClick={(e) => e.stopPropagation()}
            >
                <form action={wa + ''} className="bg-zinc-50 p-4 relative w-full h-full rounded-lg flex flex-col justify-start items-center "
                onSubmit={(e) => e.preventDefault()}
                >


                <div className="flex flex-row justify-start items-center mb-2 w-full">
                    <div className="text-slate-300 flex mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </div>
                    <div className="text-3xl text-slate-900 font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-pink-600">
                        Sync
                    </div>
                </div>
                <div className="w-full">
                    <UserInput 
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        }
                        placeholder={'youremail@usc.edu'}
                        value={uscUsername}
                        setValue={setUscUsername}
                        type={'email'}
                        autocomplete={'username'}
                        name="username"
                        f={'username'}
                    />
                </div>
               

                <div className="w-full flex flex-row justify-start items-center space-x-2 mt-2">
                        <UserInput 
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            }
                            placeholder={'yourUSCpass123'}
                            value={uscPassword}
                            setValue={setUscPassword}
                            type={'password'}
                            autocomplete={'current-password'}
                            name={'current-password'}
                            f={'password'}
                        />
                    {/* Check button */}
                    <button type="submit" className={`cursor-pointer text-zinc-50 ${uscUsername !== '' && uscPassword !== '' ? 'bg-red-500' : ''} flex  h-full aspect-square justify-center items-center rounded-lg`}
                    onClick={() => syncSubmitted()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </div>
             </form>
            </div>

        </Modal>
    )
}

interface UserInputProps {
    icon: ReactNode,
    placeholder: string,
    value: string,
    setValue: (s : string) => void,
    type: "email" | "password",
    autocomplete: string,
    name: string,
    f: string
}

const UserInput : FC<UserInputProps> = ({
    icon,
    placeholder,
    value,
    setValue,
    type,
    autocomplete,
    name,
    f
} : UserInputProps) => {

    const [isFocused, setIsFocused] = useState<boolean>(false);


    return (
        <div className={`flex-1 border-2 transition duration-250 ease-in-out ${isFocused ? 'border-red-600' : 'border-zinc-50'} rounded-md h-auto flex flex-row pr-2 py-1`}>
            {/* Icon */}
            <label htmlFor={f} className="h-full aspect-square flex justify-center items-center text-red-600 mr-1">
                {icon}
            </label>
            <input className="text-slate-700 bg-zinc-50 w-full focus:outline-none h-auto text-2xl border-none rounded-md placeholder-slate-300"
                placeholder={placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                type={type}
                autoComplete={autocomplete}
                name={name}
                // id={type}
            />
        </div>
    )
}


export default SyncModal;