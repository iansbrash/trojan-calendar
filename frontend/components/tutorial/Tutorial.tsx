// Absolutely positioned on main element
// mock header / columns so it flexes dynamically
// pointer-events-none, and not even visible if needsTutorial === false
import React, {
    FC,
    useState,
    useEffect
} from 'react';
import Modal from '../multi/Modal';
import axios from 'axios';
import api from '../../constants/api-gateway/api';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Step1, Step2 } from './Steps';

const numSteps = 10;

interface TutProps {
    tutorialModalVisible: boolean,
    setTutorialModalVisible: (x : boolean) => void,
    session: CognitoUserSession | null,

}

const Tutorial : FC<TutProps> = ({
    tutorialModalVisible,
    setTutorialModalVisible,
    session
} : TutProps) => {

    const [step, setStep] = useState<number>(1);

    const stepForward = () => {
        if (step < numSteps) {
            setStep(step + 1)
        }
    }

    const stepBackwards = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    }


    useEffect(() => {
        if (!session) return;

        (async () => {
            try {
                if (step === numSteps) {
                    // Api call to set needsTutorial = false
                    // const setTutorialFalseResponse = await axios({
                    //     method: 'get',
                    //     url: `${api}/....`,
                    //     headers: {
                    //         Authorization: session.getIdToken().getJwtToken()
                    //     }
                    // })
    
    
                    setTutorialModalVisible(false);
                }
            }
            catch (err) {
                console.error(err);
            }
            
        })();
        
    }, [step, session, setTutorialModalVisible])

    if (!tutorialModalVisible) {
        return null;
    }

    return (
        <Modal
        modalVisible={tutorialModalVisible}
        setModalVisible={setTutorialModalVisible}
        >
            <div className="w-full h-full relative">
                {/* Main modal */}
                {step === 1 ? <Step1 
                    step={step}
                    setStep={setStep}
                /> : null}


                {/* Mock header, h-20 */}
                <div className="h-20 w-full absolute top-0 left-0 right-0 px-10 flex justify-between items-center">
                    {/* Empty div for logo */}
                    <div></div>

                    {/* Icons div */}
                    <div className="flex justify-start items-center space-x-6">
                        {/* Sync */}
                        <div className="w-8 h-8">

                        </div>

                        {/* Logout */}
                        <div className="w-8 h-8">

                        </div>

                    </div>
                </div>
    
    
                {/* Columns container */}
                <div className="w-full h-full pt-20 flex flex-row justify-center items-center p-5">
                    {/* Assignments */}
                    <div className={`h-full p-5
                            block
                            w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5
                    `}>
                        <div className="w-full relative">
                            <Step2 
                                step={step}
                                setStep={setStep}
                            />
                        </div>

                    </div>
                    {/* Grades */}
                    <div className={`h-full p-5
                            hidden md:block
                            w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5
                    `}></div>

                    {/* Schedule */}
                    <div className={`h-full p-5
                            hidden lg:block
                            w-1/3 xl:w-1/4 2xl:w-1/5
                    `}></div>

                    {/* Notes */}
                    <div className={`h-full p-5
                            hidden xl:block
                            w-1/4 2xl:w-1/5
                    `}></div>

                    {/* Announcements */}
                    <div className={`h-full p-5
                            hidden 2xl:block
                            w-1/5
                    `}></div>

                </div>
    
            </div>
            

        </Modal>
    )
}

Tutorial.displayName = 'Tutorial';

export default Tutorial;