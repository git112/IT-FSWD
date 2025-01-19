const os = require('os');
const fs = require('fs');
const path = require('path');

function getSystemInfo(){
    const systemInfo = {
        osType: os.type(),
        osPlatform: os.platform(),
        osRelease: os.release(),
        totalMemory: `${(os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)} GB`,
        freeMemory: `${(os.freemem() / (1024 * 1024 * 1024)).toFixed(2)} GB`,
        cpuModel: os.cpus()[0].model,
        cpuCores: os.cpus().length,
        uptime: `${(os.uptime() / 3600).toFixed(2)} hours`
    };

    return systemInfo;
}

function saveSystemInfo(info) {
   
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }

    const logPath = path.join(logsDir, 'system-info.txt');
    const timestamp = new Date().toISOString();
    
    const logContent = `System Information (${timestamp})\n` +
        `==========================================\n` +
        `OS Type: ${info.osType}\n` +
        `OS Platform: ${info.osPlatform}\n` +
        `OS Release: ${info.osRelease}\n` +
        `Total Memory: ${info.totalMemory}\n` +
        `Free Memory: ${info.freeMemory}\n` +
        `CPU Model: ${info.cpuModel}\n` +
        `CPU Cores: ${info.cpuCores}\n` +
        `System Uptime: ${info.uptime}\n` +
        `==========================================\n\n`;

    fs.appendFileSync(logPath, logContent);
    return logPath;
}

try {
    console.log('Collecting system information...');
    const systemInfo = getSystemInfo();
    
    console.log('\nSystem Information:');
    console.log('------------------');
    Object.entries(systemInfo).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });

    const logPath = saveSystemInfo(systemInfo);
    console.log(`\nSystem information has been saved to: ${logPath}`);
} catch (error) {
    console.error('Error:', error.message);
}