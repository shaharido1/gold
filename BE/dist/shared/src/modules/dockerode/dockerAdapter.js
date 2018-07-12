"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dockerode = require("dockerode");
const docker = new Dockerode();
const ErrorMessage = {
    noSuchContainer: 'no such container'
};
class DockerAdapter {
    constructor() {
        this.containers = [];
    }
    startContainer(imageName) {
        this.name = imageName + '-1';
        return new Promise((resolve, reject) => {
            this.ifExistDestroy().then(() => {
                docker.createContainer({
                    Image: imageName,
                    Tty: false,
                    name: this.name,
                    HostConfig: { PortBindings: { '6379/tcp': [{ 'HostPort': '6379' }] } }
                })
                    .then((container) => {
                    container.start()
                        .then(() => {
                        console.log('id: ' + container.id);
                        this.containers.push(container);
                        resolve(this.defaultContainer = container);
                    });
                })
                    .catch(err => {
                    console.log('cant create');
                    console.error(err);
                    reject();
                });
            });
        });
    }
    ifExistDestroy(dockerName = this.name) {
        return new Promise((resolve, reject) => {
            const container = docker.getContainer(dockerName);
            container.remove({ force: true }).then(() => {
                resolve();
            }).catch((e) => {
                if (e.reason === ErrorMessage.noSuchContainer) {
                    resolve();
                }
                else {
                    console.log('can\'t kill');
                    console.log(e);
                    reject();
                }
            });
        });
    }
    getContainerById(continerId = this.defaultContainer.id) {
        return docker.getContainer(continerId);
    }
    killContainer(container = this.defaultContainer) {
        return container.kill();
    }
    stopContaioner(container = this.defaultContainer) {
        return container.stop();
    }
}
exports.DockerAdapter = DockerAdapter;
//# sourceMappingURL=dockerAdapter.js.map