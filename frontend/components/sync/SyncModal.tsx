import React, {
    FC, ReactNode, useState
} from 'react';
import Modal from '../multi/Modal';

export enum SyncStage {
    idle,
    initiate,
    confirm,
    fetch,
    ERRORbadlogin
}

interface SyncModalProps {
    syncModalVisible: boolean,
    setSyncModalVisible: (b : boolean) => void,
    trySync: (u : string, p : string) => Promise<void>,
    setSyncStage: (ss : SyncStage) => void
}

const SyncModal : FC<SyncModalProps> = ({
    syncModalVisible,
    setSyncModalVisible,
    trySync,
    setSyncStage
} : SyncModalProps) => {

    const [uscUsername, setUscUsername] = useState<string>('')
    const [uscPassword, setUscPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const [wa, setWa] = useState<number>(0)

    const syncSubmitted = async () => {

        let validateError = validateInput(uscUsername, uscPassword);

        if (validateError !== '') {
            console.log(`Error is this; ${validateError}`)
            return;
        }

        try {
            setWa(wa + 1)
            setSyncModalVisible(false)
            await trySync(uscUsername, uscPassword)
        }
        catch (err : any) {
            setError(err)
            if (err === 'Error: user/pass is incorrect') {
                console.log('bad login!')
                setSyncStage(SyncStage.ERRORbadlogin)
            }
        }
    }

    const validateInput = (u : string, p : string) : string => {
        // Check there is input
        if (u === '') {
            let error = 'Please enter your @usc.edu email'
            setError(error)
            return error;
        }
        else if (u.indexOf('@usc.edu') === -1) {
            let error = 'Please enter your @usc.edu email'
            setError('Please enter your @usc.edu email')
            return error;
        }
        else if (p === '') {
            let error = 'Please enter your @usc.edu password'
            setError('Please enter your @usc.edu password')
            return error;
        }
        else {
            let error = ''
            setError('');
            return error;
        }
    }


    return (
        <Modal 
        modalVisible={syncModalVisible}
        setModalVisible={setSyncModalVisible}>
            <div className="flex flex-col justify-center items-center">
                <div className="p-2  w-96 h-auto bg-zinc-50 rounded-xl drop-shadow-lg bg-gradient-to-br from-pink-500 to-red-500"
                onClick={(e) => e.stopPropagation()}
                >
                    <form noValidate={true} action={wa + ''} className="bg-zinc-50 p-4 relative w-full h-full rounded-lg flex flex-col justify-start items-center "
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
                        onClick={async () => await syncSubmitted()}
                        disabled={uscUsername === '' || uscPassword === ''}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                    </div>
                </form>
                </div>

                <div className="w-96 relative">
                    <div className={`${error === '' ? 'opacity-0 pointer-events-none' : 'opacity-100'} rounded-lg p-2 transition duration-250 ease-in-out absolute top-2 left-0 right-0 h-auto bg-gradient-to-r from-pink-500 to-red-500 flex justify-center items-center`}>
                        <div className="text-white mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div className="font-medium text-lg text-white">
                            {error}
                        </div>
                    </div>
                </div>

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