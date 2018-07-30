
import { Container } from 'dockerode';
import { DockerAdapter } from '../../dockerode/dockerAdapter';
import Doc = Mocha.reporters.Doc;


export class RabbitContainerAdapter {

  private imageName : string;
  readonly rabbitContainerName: string;
  public rabbitContainer : Container;
  private dockerAdapter: DockerAdapter;
  readonly exportPort: string;

  constructor(exportPort : string, imageName: string =  'rabbitmq:3', rabbitContainerName: string =  'rabbit') {
    this.imageName = imageName;
    this.dockerAdapter = new DockerAdapter();
    this.exportPort = exportPort;
    this.rabbitContainerName = rabbitContainerName;
  }

  public createRabbitContainer(): Promise<Container> {
    return new Promise((resolve, reject) => {
      if (this.rabbitContainer) {
        resolve(this.rabbitContainer);
      }
      else {
        this.createContainer()
            .then((container) => resolve(this.rabbitContainer = container))
            .catch(() => {
              this.buildImage().then(() => {
                this.createContainer()
                    .then((container) => resolve(this.rabbitContainer = container))
                    .catch(() => reject());
              });
            });
      }
    });
  }

  private buildImage(imageName = this.imageName) : Promise<void> {
    return this.dockerAdapter.buildImage({ context: __dirname, path: './Dockerfile' }, imageName);
  }

  private createContainer(imageName = this.imageName) : Promise<Container> {
    return this.dockerAdapter.startContainer(imageName, this.exportPort, this.rabbitContainerName);
  }
}
