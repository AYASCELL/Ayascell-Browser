import React from 'react';
import { Minus, Square, X } from 'lucide-react';
import logo from '../assets/logo.jpg';

const TitleBar = () => {
    const { ipcRenderer } = window.require('electron');

    const handleMinimize = () => ipcRenderer.send('minimize-window');
    const handleMaximize = () => ipcRenderer.send('maximize-window');
    const handleClose = () => ipcRenderer.send('close-window');

    return (
        <div className="title-bar">
            <div className="drag-region">
                <img src={logo} alt="Logo" className="app-icon" />
                <span className="app-title">Ayascell Browser</span>
            </div>
            <div className="window-controls">
                <button onClick={handleMinimize} className="control-btn minimize">
                    <Minus size={16} />
                </button>
                <button onClick={handleMaximize} className="control-btn maximize">
                    <Square size={14} />
                </button>
                <button onClick={handleClose} className="control-btn close">
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default TitleBar;
