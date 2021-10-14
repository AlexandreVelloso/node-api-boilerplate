import * as fs from 'fs';
import { exec } from 'child_process';

import ResourceConfig from './configs/ResourceConfig.json';

const resourceName = process.argv.slice(2)[0];

createFoldersIfNotExist({ path: 'api' });
createFoldersIfNotExist({ path: 'database' });
createFoldersIfNotExist({ path: 'tests' });

createResourceMigration(resourceName);

ResourceConfig.folders.forEach(config => {

    createFoldersIfNotExist(config);

    switch (config.name) {
        case 'controller':
            createFile(config, 'ControllerTemplate', resourceName);
            break;
        case 'dto':
            createFile(config, 'DTOTemplate', resourceName);
            break;
        case 'repository':
            createFile(config, 'RepositoryTemplate', resourceName);
            break;
        case 'route':
            createFile(config, 'RouteTemplate', resourceName);
            break;
        case 'service':
            createFile(config, 'ServiceTemplate', resourceName);
            break;
        case 'validator':
            createFile(config, 'CreateValidatorTemplate', resourceName);
            createFile(config, 'UpdateValidatorTemplate', resourceName);
            break;
        case 'model':
            createFile(config, 'ModelTemplate', resourceName);
            break;
        case 'e2eTest':
            break;
        case 'integration':
            break;
        case 'schema':
            break;
        case 'utils':
            break;
        default:
            break;
    }

});

function createFile(config: any, templateName: string, resourceName: string): void {
    let fileData = fs.readFileSync('./Templates/' + templateName + '.txt').toString();

    fileData = fileData.replace(new RegExp('{ResourceName}', 'g'), capitalizeFirstLetter(resourceName))
        .replace(new RegExp('{SingleResource}', 'g'), undercapitalizeFirstLetter(resourceName));

    saveFile(fileData, resourceName, config);
}

function capitalizeFirstLetter(value: string): string {
    if (value == null || value == undefined || value === '') {
        return value;
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
}

function undercapitalizeFirstLetter(value: string): string {
    if (value == null || value == undefined || value === '') {
        return value;
    }

    return value.charAt(0).toLowerCase() + value.slice(1);
}

function createFoldersIfNotExist(config: any) {
    const dir = 'result/' + config.path;;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

function saveFile(fileData: string, resourceName: string, config: any) {
    let filePath = 'result/' + config.path + '/' + resourceName;
    filePath += config.fileSuffix ? config.fileSuffix : '';
    filePath += '.' + config.extension;

    console.log(`Creating file ${filePath}`);

    fs.writeFileSync(filePath, fileData);
}

function createResourceMigration(resourceName: string) {
    exec("npx ", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}