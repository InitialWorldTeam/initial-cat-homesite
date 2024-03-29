import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { Viewer } from './viewer.js';
import { SimpleDropzone } from 'simple-dropzone';
import queryString from 'query-string';

if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    console.error('The File APIs are not fully supported in this browser.');
} else if (!WEBGL.isWebGLAvailable()) {
    console.error('WebGL is not supported in this browser.');
}

export default class threeRender {

    /**
     * @param  {Element} el
     */
    constructor(el, option={}) {

        this.options = {
            ...option
        };

        this.viewer = null;
        this.viewerEl = null;
        this.dropEl = document.querySelector(el);
    }

    /**
     * Sets up the view manager.
     * @return {Viewer}
     */
    createViewer() {
        if (!this.dropEl) return;
        this.viewerEl = document.createElement('div');
        this.viewerEl.classList.add('viewer');
        this.dropEl.innerHTML = '';
        this.dropEl.appendChild(this.viewerEl);
        this.viewer = new Viewer(this.viewerEl, this.options);
        return this.viewer;
    }

    /**
     * Loads a fileset provided by user action.
     * @param  {Map<string, File>} fileMap
     */
    load(fileMap) {

        let rootFile;
        let rootPath;
        Array.from(fileMap).forEach(([path, file]) => {
            if (file.name.match(/\.(gltf|glb)$/)) {
                rootFile = file;
                rootPath = path.replace(file.name, '');
            }
        });

        if (!rootFile) {
            this.onError('No .gltf or .glb asset found.');
        }

        this.view(rootFile, rootPath, fileMap);
    }

    /**
     * Passes a model to the viewer, given file and resources.
     * @param  {File|string} rootFile
     * @param  {string} rootPath
     * @param  {Map<string, File>} fileMap
     */
    view(rootFile, type) {

        if (this.viewer) this.viewer.clear();

        const viewer = this.viewer || this.createViewer();
        if (!viewer) return;

        let fileURL = typeof rootFile === 'string'
            ? rootFile
            : URL.createObjectURL(rootFile);

        const cleanup = () => {
            if (typeof rootFile === 'object') URL.revokeObjectURL(fileURL);
        };

        viewer
            .load(fileURL, type)
            .catch((e) => this.onError(e))
            .then((gltf) => {
                cleanup();
            });
    }

    clear() {
        const viewer = this.viewer || this.createViewer();

        viewer.clear();
    }

    /**
     * @param  {Error} error
     */
    onError(error) {
        let message = (error || {}).message || error.toString();
        if (message.match(/ProgressEvent/)) {
            message = 'Unable to retrieve this file. Check JS console and browser network tab.';
        } else if (message.match(/Unexpected token/)) {
            message = `Unable to parse file content. Verify that this file is valid. Error: "${message}"`;
        } else if (error && error.target && error.target instanceof Image) {
            message = 'Missing texture: ' + error.target.src.split('/').pop();
        }
        window.alert(message);
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {});
