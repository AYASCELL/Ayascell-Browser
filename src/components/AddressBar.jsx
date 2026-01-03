import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Search } from 'lucide-react';

const AddressBar = ({ url, onNavigate, onRefresh, onBack, onForward }) => {
    const [inputUrl, setInputUrl] = useState(url);

    const handleSubmit = (e) => {
        e.preventDefault();
        let target = inputUrl;
        if (!target.startsWith('http://') && !target.startsWith('https://')) {
            // Eğer bir URL değilse Google araması yap
            if (!target.includes('.')) {
                target = `https://www.google.com/search?q=${encodeURIComponent(target)}`;
            } else {
                target = `https://${target}`;
            }
        }
        onNavigate(target);
    };

    return (
        <div className="address-bar-container">
            <div className="nav-buttons">
                <button onClick={onBack} className="nav-btn"><ArrowLeft size={18} /></button>
                <button onClick={onForward} className="nav-btn"><ArrowRight size={18} /></button>
                <button onClick={onRefresh} className="nav-btn"><RotateCw size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} className="url-input-wrapper">
                <Search size={16} className="search-icon" />
                <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    placeholder="Web'de arayın veya bir URL yazın"
                    className="url-input"
                />
            </form>
        </div>
    );
};

export default AddressBar;
