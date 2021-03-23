const express = require('express');
const moment = require('moment');
const app = express();
const port = 8001;
const fs = require('fs');

function getContainers() {
    // START LIST CONTAINERS
    // UNCOMMENT
    // Create our result to send.
    let result = { "status": "success", "containers": [] };

    // Read file names within the Files directory
    let files = fs.readdirSync('Files', { withFileTypes: true });
    // Look through our list of file names
    files.forEach(file => {
        // If a file is a directory, add it to our response
        if (file.isDirectory()) {
            result.containers.push({ 'containerName': file.name });
        }
    });

    // If we found more than one directory, return a success with the names
    if (result.containers.length > 0) {
        return result;
    } else {
        // else return false
        return { 'status': 'error' };
    }
    // UNCOMMENT
    // END LIST CONTAINERS
}

function getFileMetadata(containerName, objectName) {
    // START GET A SINGLE FILE'S METADATA
    // UNCOMMENT
    let path = './Files/' + containerName + "/" + objectName;
    // Double check that this file exists. If not, error out.
    if (fs.existsSync(path) !== true) {
        return { status: "error" };
    }

    // If the file does exist, pull the file stats and return them
    let stats = fs.statSync(path);
    return {
        status: "success",
        containerName: containerName,
        objectName: objectName,
        dataCreated: moment(stats.birthtime).format("DD/MM/YYYY HH:mm:ss"),
        lastModified: moment(stats.mtime).format("DD/MM/YYYY HH:mm:ss"),
        owner: stats.uid,
        sizeInBytes: stats.size,
        schemaFields: null,
        sarCapable: false,
        customFields: [
            {
                fieldName: "file_type",
                fieldValue: "pdf"
            }
        ]
    }
    // UNCOMMENT
    // END GET A SINGLE FILE'S METADATA
}

function getContainerMetadata(containerName,offset) {
    // START GET ALL METADATA
    // UNCOMMENT
    // Create our result to send.
    let result = { "status": "success", "objects": [] };

    // Read file names within the Files directory
    let files = fs.readdirSync('Files/'+containerName, { withFileTypes: true });
    // Look through our list of file names
    files.forEach(file => {
        // Use the metadata function we wrote in the last exercise to return the metadata
        result.objects.push(getFileMetadata(containerName, file.name));
    });

    // If we found more than one file, return a success with the metadata
    if (result.objects.length > 0) {
        // Set offset just to the length of the record. 
        // We implemented the offset within our Shopify connector and have left implementing it here to the reader.
        result.offset = result.objects.length;
        return result;
    } else {
        // else return false
        return { 'status': 'error' };
    }
    // UNCOMMENT
    // END GET ALL METADATA
}

function getFileContents(containerName, objectName) {
    // START GET FILE CONTENTS
    // UNCOMMENT
    let path = './Files/' + containerName + "/" + objectName;
    // Double check that this file exists. If not, error out.
    if (fs.existsSync(path) !== true) {
        return { status: "error" };
    }
    return fs.readFileSync(path);
    // UNCOMMENT
    // END GET FILE CONTENTS
}

app.get('/containers', (req, res) => {
    return res.send(getContainers());
});

app.get('/objects/:containerName', (req, res) => {
    return res.send(getContainerMetadata(req.params.containerName));
});


app.get('/objects/:containerName/:objectName/describe', (req, res) => {
    return res.send(getFileMetadata(req.params.containerName,req.params.objectName));
});

app.get('/objects/:containerName/:objectName/content-stream', (req, res) => {
    res.setHeader("Content-Type", "application/pdf")
    return res.send(getFileContents(req.params.containerName,req.params.objectName));
});


app.listen(port, () => {
    console.log(`Unstructured Connector listening at http://localhost:${port}`)
})