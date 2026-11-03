# Unstructured PDF Connector Sample

A small Node.js/Express training service that treats PDF files under `Files/<container>/` as unstructured objects. The repository includes sample PDFs grouped into container directories (`2020/` and `2021/`). It uses `pdf-parse` for text extraction.

## Run locally

Requires Node.js and npm.

```sh
npm install
node index.js
```

The service listens on **port 8001**. There is no Dockerfile or `npm start` script in this repository.

## Routes

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/containers` | List directories under `Files/`. |
| `GET` | `/objects/:containerName` | List file metadata for a container. |
| `GET` | `/objects/:containerName/:objectName/describe` | Return metadata for one file. |
| `GET` | `/objects/:containerName/:objectName/content-stream` | Return the PDF bytes. |
| `POST` | `/objects/:containerName/:objectName/sar` | Prototype text search against a PDF. |

## Limitations and security

This is a local-file demo with no authentication. The SAR handler is unfinished and should not be relied on: its current search loop can fail to advance after a match, and the route does not await the asynchronous parser. Review the sample PDFs and replace/handle files appropriately before using this outside a local training environment.

<!-- bigidsecure-community-guidance -->
## BigID Community

This repository is part of [BigID Community](https://github.com/bigidsecure), a place for community members to share code, integrations, examples, and projects with other BigID customers.

Project ownership and support vary by repository. Check the maintainers, license, prerequisites, and compatibility notes before use, and validate the project in your own environment. Unless this repository explicitly says otherwise, do not assume the project is officially supported or maintained by BigID.

Please do not commit credentials, customer data, or other confidential information. Check this repository’s contribution guidance before submitting changes.
