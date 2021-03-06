import { Container, default as Dockerode } from 'dockerode';
import { createWriteStream } from 'fs';

const ErrorMessage = {
  noSuchContainer: 'no such container'
};

export class DockerAdapter {

  name: string;
  containers: Array<Container> = [];
  defaultContainer;
  public docker: Dockerode = new Dockerode();

  // public getImage(imageName): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     return this.docker.getImage(imageName)
  //
  //   })
  // }

  public buildImage({ context, path }, imageName) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.docker.buildImage({ context, src: [path] }, { t: imageName }, (err, stream) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        stream.pipe(process.stdout, { end: true });
        stream.on('end', () => resolve());
      });
    });
  }


  public startContainer(imageName, exposePort, containerName = imageName): Promise<Container> {
    const port = `${exposePort}/tcp`;
    return new Promise((resolve, reject) => {
      this.ifExistDestroy(containerName)
          .then(() => {
            const createOptions: Dockerode.ContainerCreateOptions = {
              Image: imageName,
              name: containerName,
              ExposedPorts: { [`${port}`]: {} },
              HostConfig: { PortBindings: { [`${port}`]: [{ HostPort: exposePort }] } },
              AttachStderr: true
            };
            createOptions;
            this.docker.createContainer(createOptions).then((container: Container) => {
              this.defaultContainer = container;
              this.containers.push(container);
              container.start().then(cont => {
                console.log('id: ' + cont.id);
                return resolve(container);

              });
            });
          })
          .catch(err => {
            console.log('cant create container' + containerName);
            reject(err);
          });
    });
  }

  ifExistDestroy(dockerName = this.name) {
    return new Promise((resolve, reject) => {
      const container = this.docker.getContainer(dockerName);
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
    return this.docker.getContainer(continerId);
  }

  killContainer(container = this.defaultContainer) {
    return container.kill();
  }

  stopContaioner(container = this.defaultContainer) {
    return container.stop();
  }
}
