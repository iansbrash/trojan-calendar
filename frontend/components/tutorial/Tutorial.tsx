// Absolutely positioned on main element
// mock header / columns so it flexes dynamically
// pointer-events-none, and not even visible if needsTutorial === false
import React, {
    FC,
    useState,
    useEffect,
    useRef
} from 'react';
import Modal from '../multi/Modal';
import axios from 'axios';
import api from '../../constants/api-gateway/api';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Step1, Step10, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9 } from './Steps';

const numSteps = 11;

interface TutProps {
    tutorialModalVisible: boolean,
    setTutorialModalVisible: (x : boolean) => void,
    session: CognitoUserSession | null,
    setSyncModalVisible: (x : boolean) => void,
    step: number,
    setStep: (x : number) => void

}

const Tutorial : FC<TutProps> = ({
    tutorialModalVisible,
    setTutorialModalVisible,
    session,
    setSyncModalVisible,
    step,
    setStep
} : TutProps) => {


    useEffect(() => {
        if (!session) return;

        (async () => {
            try {
                if (step === numSteps) {
                    // Api call to set needsTutorial = false
                    const setTutorialFalseResponse = axios({
                        method: 'post',
                        url: `${api}/account/settings`,
                        headers: {
                            Authorization: session.getIdToken().getJwtToken()
                        },
                        data: JSON.stringify({
                            settings: {
                                needsTutorial: false
                            }
                        })
                    })
    
                    setSyncModalVisible(true);
                    setTutorialModalVisible(false);
                }
            }
            catch (err) {
                console.error(err);
            }
            
        })();
        
    }, [step, session, setTutorialModalVisible, setSyncModalVisible])

    const step2Ref = useRef<HTMLDivElement>(document.createElement('div'));
    const step3Ref = useRef<HTMLDivElement>(document.createElement('div'));
    const step4Ref = useRef<HTMLDivElement>(document.createElement('div'));
    const step5Ref = useRef<HTMLDivElement>(document.createElement('div'));
    const step6Ref = useRef<HTMLDivElement>(document.createElement('div'));

    const handleRef = (ref : React.RefObject<HTMLDivElement>) => {
        if (ref.current) { // && !isScrolledIntoView(ref.current)
            ref.current.scrollIntoView({
                // behavior: 'smooth',
                inline: 'end',
            });
        }
    }

    useEffect(() => {
        switch (step) {
            case 2:
                handleRef(step2Ref)
                break;
            case 3:
                handleRef(step3Ref)
                break;
            case 4:
                handleRef(step4Ref)
                break;
            case 5:
                handleRef(step5Ref)
                break;
            case 6:
                handleRef(step6Ref)
                break;
            default:
                break;
        } 
    }, [step])

    if (!tutorialModalVisible) {
        return null;
    }

    return (
        <Modal
        modalVisible={tutorialModalVisible}
        setModalVisible={setTutorialModalVisible}
        clickExitDisabled={true}
        >
            <div className="w-full h-full relative">
                {/* Main modal */}
                {step === 1 ? <Step1 
                    step={step}
                    setStep={setStep}
                /> : null}

                {step === 10 ? <Step10
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
                        <div className="w-12 h-12 flex flex-col">
                            <div className="w-12 h-12">

                            </div>
                            <div className="relative">
                                {step === 7 ? <Step7 
                                    step={step}
                                    setStep={setStep}
                                /> : null}

                                {step === 8 ? <Step8 
                                    step={step}
                                    setStep={setStep}
                                /> : null}

                                {step === 9 ? <Step9 
                                    step={step}
                                    setStep={setStep}
                                /> : null}
                            </div>
                        </div>

                        {/* Logout */}
                        <div className="w-12 h-12">

                        </div>

                    </div>
                </div>
    
    
                {/* Columns container */}
                <div className="w-full h-full pt-20 flex flex-row justify-start items-center p-5 overflow-x-hidden">
                    {/* Assignments */}
                    <div className={`h-full p-5
                            min-w-[24rem]
                    `}>
                        <div ref={step2Ref}  className="w-full h-full relative">
                            {step === 2 ? <Step2 
                                step={step}
                                setStep={setStep}
                            /> : null}
                        </div>

                    </div>
                    {/* Grades */}
                    <div className={`h-full p-5
                            min-w-[24rem]
                    `}>
                        <div ref={step3Ref} className="w-full h-full relative">
                            {step === 3 ? <Step3 
                                step={step}
                                setStep={setStep}
                            /> : null}
                        </div>
                    </div>

                    {/* Schedule */}
                    <div className={`h-full p-5
                            min-w-[24rem]
                    `}>
                        <div ref={step4Ref}  className="w-full h-full relative">
                            {step === 4 ? <Step4 
                                step={step}
                                setStep={setStep}
                            /> : null}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className={`h-full p-5
                            min-w-[24rem]
                    `}>
                        <div ref={step5Ref} className="w-full h-full relative">
                            {step === 5 ? <Step5
                                step={step}
                                setStep={setStep}
                            /> : null}
                        </div>
                    </div>

                    {/* Announcements */}
                    <div className={`h-full p-5
                            min-w-[24rem]
                    `}>
                        <div ref={step6Ref} className="w-full h-full relative">
                            {step === 6 ? <Step6
                                step={step}
                                setStep={setStep}
                            /> : null}
                        </div>
                    </div>

                </div>
    
            </div>
            

        </Modal>
    )
}

Tutorial.displayName = 'Tutorial';

export default Tutorial;