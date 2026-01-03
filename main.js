const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = !app.isPackaged; // Basit bir dev kontrolü

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false, // Özel başlık çubuğu için çerçevesiz
        backgroundColor: '#000000', // Siyah arka plan (yüklenirken beyaz parlamayı önler)
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Basitlik için false (prodüksiyonda preload kullanılabilir)
            webviewTag: true // WebView etiketi kullanımı için gerekli
        },
        icon: path.join(__dirname, 'assets/logo.jpg')
    });

    // Geliştirme ortamında Vite sunucusuna, üretimde build çıktısına yönlendir
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
    }

    // Pencere kontrolleri (kapat, küçült, büyüt)
    ipcMain.on('minimize-window', () => mainWindow.minimize());
    ipcMain.on('maximize-window', () => {
        if (mainWindow.isMaximized()) mainWindow.unmaximize();
        else mainWindow.maximize();
    });
    ipcMain.on('close-window', () => mainWindow.close());
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
