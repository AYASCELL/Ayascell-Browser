import React from 'react';
import { X, Plus } from 'lucide-react';

const TabBar = ({ tabs, activeTabId, onSwitchTab, onCloseTab, onNewTab }) => {
    return (
        <div className="tab-bar">
            <div className="tabs-list">
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        className={`tab-item ${tab.id === activeTabId ? 'active' : ''}`}
                        onClick={() => onSwitchTab(tab.id)}
                    >
                        <span className="tab-title">{tab.title || 'Yeni Sekme'}</span>
                        <button
                            className="close-tab-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onCloseTab(tab.id);
                            }}
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
                <button onClick={onNewTab} className="new-tab-btn">
                    <Plus size={18} />
                </button>
            </div>
        </div>
    );
};

export default TabBar;
