import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import '../styles/error-modal.scss';
const ErrorModalWindow = ({ show }) => {

    const error = useSelector(state => state.clientsData.error);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                show(false)
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [])

    return (
        <div className="error-modal-window" id="error-modal-window">
            <div className="container">
                <div className="err-header">Esc - закрыть</div>
                <div className="error-block">
                    <div className="title"><span>{error.message}</span></div>
                    {error.errors?.map((err, index) => {
                        return <div key={index} className="err">
                            {Object.keys(err).map((key, index) => {
                                return <div key={Date.now + index}>{`${key}: ${err[key]}`}</div>
                            })}
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default ErrorModalWindow;