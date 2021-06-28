import fs from "fs";

const checkExistFileDirectory = (pathFile: string) => {
    if (fs.existsSync(pathFile)) {
        return true;
    }

    return false;
}

const createFileDirectory = async (pathFile: string) => {
    if (! checkExistFileDirectory(pathFile)) {
        await fs.promises.mkdir(pathFile, {recursive: true});
    }
}

const moveFile = (file: any, pathDirection: string) => {
    let output: boolean = true;
    file.mv(pathDirection, function(err: any) {
        if(err){
            output = false;
        }
    });

    return output;
}

export {
    checkExistFileDirectory,
    createFileDirectory,
    moveFile
}