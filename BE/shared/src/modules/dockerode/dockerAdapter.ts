import * as Dockerode from 'dockerode';
import { Container } from 'dockerode';


const docker = new Dockerode();

const ErrorMessage = {
  noSuchContainer: 'no such container'
};

export class DockerAdapter {

  name: string;
  containers: Array<Container> = [];
  defaultContainer;

  startContainer(imageName: string) {
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
    return container.kill()
  }

  stopContaioner(container = this.defaultContainer) {
    return container.stop();
  }
}
