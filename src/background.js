import {
    app, protocol, screen, BrowserWindow
} from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import { onlyInDev } from '~config/environtment';

const isDevelopment = process.env.NODE_ENV !== 'production';

let win;

protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
]);

function createWindow() {
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true
        },
        show: false,
        titleBarStyle: 'hiddenInset'
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        onlyInDev(() => {
            win.webContents.openDevTools();
        });
    } else {
        createProtocol('app');
        win.loadURL('app://./index.html');
    }

    win.once('ready-to-show', () => {
        win.showInactive();
        const { width, height } = screen.getPrimaryDisplay().workAreaSize;
        win.setSize(width - 100, height - 100);
        win.center();
    });

    win.on('closed', () => {
        win = null;
    });
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

app.on('ready', async () => {
    createWindow();
});

if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit();
            }
        });
    } else {
        process.on('SIGTERM', () => {
            app.quit();
        });
    }
}
