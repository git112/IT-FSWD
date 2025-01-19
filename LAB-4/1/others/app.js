const fs = require('fs');
const path = require('path');

const fileTypes = {
    images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'],
    documents: ['.pdf', '.doc', '.docx', '.txt', '.md', '.csv', '.xlsx', '.xls'],
    videos: ['.mp4', '.mov', '.avi', '.mkv', '.wmv'],
    audio: ['.mp3', '.wav', '.flac', '.m4a', '.aac'],
};

class Logger {
    constructor(basePath) {
        this.logFile = path.join(basePath, 'summary.txt');
        this.logs = [];
    }

    log(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}`;
        this.logs.push(logMessage);
        console.log(message);
    }

    async save() {
        const summary = this.logs.join('\n');
        await fs.promises.writeFile(this.logFile, summary, 'utf8');
    }
}

class FileOrganizer {
    constructor(directoryPath) {
        this.directoryPath = directoryPath;
        this.logger = new Logger(directoryPath);
    }

    getFileCategory(extension) {
        extension = extension.toLowerCase();
        for (const [category, extensions] of Object.entries(fileTypes)) {
            if (extensions.includes(extension)) {
                return category;
            }
        }
        return 'others';
    }

    async createDirectories() {
        const categories = [...Object.keys(fileTypes), 'others'];
        
        for (const category of categories) {
            const categoryPath = path.join(this.directoryPath, category);
            try {
                await fs.promises.mkdir(categoryPath, { recursive: true });
                this.logger.log(`Created directory: ${category}`);
            } catch (error) {
                if (error.code !== 'EEXIST') {
                    throw error;
                }
            }
        }
    }

    async moveFile(file) {
        const filePath = path.join(this.directoryPath, file);
        const extension = path.extname(file);
        
        const stats = await fs.promises.stat(filePath);
        if (stats.isDirectory() || file === 'summary.txt') {
            return;
        }

        const category = this.getFileCategory(extension);
        const destinationDir = path.join(this.directoryPath, category);
        const destinationPath = path.join(destinationDir, file);

        try {
            await fs.promises.rename(filePath, destinationPath);
            this.logger.log(`Moved ${file} to ${category}`);
        } catch (error) {
            this.logger.log(`Error moving ${file}: ${error.message}`);
        }
    }

    async organize() {
        try {
         
            const files = await fs.promises.readdir(this.directoryPath);
            this.logger.log(`Found ${files.length} files to organize`);

          
            await this.createDirectories();

            const movePromises = files.map(file => this.moveFile(file));
            await Promise.all(movePromises);

            await this.logger.save();
            this.logger.log('Organization complete! Check summary.txt for details.');

        } catch (error) {
            this.logger.log(`Error during organization: ${error.message}`);
            throw error;
        }
    }
}

async function main() {
    
    const directoryPath = process.argv[2];

    if (!directoryPath) {
        console.error('Please provide a directory path');
        process.exit(1);
    }

    try {
        const organizer = new FileOrganizer(directoryPath);
        await organizer.organize();
    } catch (error) {
        console.error('Organization failed:', error.message);
        process.exit(1);
    }
}

main();