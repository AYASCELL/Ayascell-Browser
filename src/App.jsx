import React, { useState, useEffect } from 'react';
import TitleBar from './components/TitleBar';
import TabBar from './components/TabBar';
import AddressBar from './components/AddressBar';
import logo from './assets/logo.jpg'; // Logo import edildi

function App() {
    const [tabs, setTabs] = useState([
        { id: 1, title: 'Yeni Sekme', url: 'https://www.google.com' }
    ]);
    const [activeTabId, setActiveTabId] = useState(1);
    const [urlInput, setUrlInput] = useState('https://www.google.com');

    // Aktif sekme değiştiğinde URL inputunu güncelle
    useEffect(() => {
        const activeTab = tabs.find(t => t.id === activeTabId);
        if (activeTab) {
            setUrlInput(activeTab.url);
        }
    }, [activeTabId, tabs]);

    const handleNewTab = () => {
        const newId = Math.max(...tabs.map(t => t.id), 0) + 1;
        const newTab = { id: newId, title: 'Yeni Sekme', url: 'https://www.google.com' };
        setTabs([...tabs, newTab]);
        setActiveTabId(newId);
    };

    const handleCloseTab = (id) => {
        if (tabs.length === 1) return; // Son sekmeyi kapatma (şimdilik)

        const newTabs = tabs.filter(t => t.id !== id);
        setTabs(newTabs);

        if (activeTabId === id) {
            setActiveTabId(newTabs[newTabs.length - 1].id);
        }
    };

    const handleNavigate = (url) => {
        setTabs(tabs.map(tab =>
            tab.id === activeTabId ? { ...tab, url: url } : tab
        ));
        setUrlInput(url);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-dark)' }}>
            <TitleBar />
            <TabBar
                tabs={tabs}
                activeTabId={activeTabId}
                onSwitchTab={setActiveTabId}
                onCloseTab={handleCloseTab}
                onNewTab={handleNewTab}
            />

            <AddressBar
                url={urlInput}
                onNavigate={handleNavigate}
                onRefresh={() => {
                    // WebView'e refresh sinyali gönderilecek (ref ile)
                    const webview = document.querySelector(`webview[data-id="${activeTabId}"]`);
                    if (webview) webview.reload();
                }}
                onBack={() => {
                    const webview = document.querySelector(`webview[data-id="${activeTabId}"]`);
                    if (webview && webview.canGoBack()) webview.goBack();
                }}
                onForward={() => {
                    const webview = document.querySelector(`webview[data-id="${activeTabId}"]`);
                    if (webview && webview.canGoForward()) webview.goForward();
                }}
            />

            <div className="browser-content">
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        style={{ display: activeTabId === tab.id ? 'block' : 'none', height: '100%' }}
                    >
                        <webview
                            data-id={tab.id}
                            src={tab.url}
                            style={{ width: '100%', height: '100%' }}
                        // WebView event listeners eklenebilir (did-navigate vs için)
                        ></webview>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
