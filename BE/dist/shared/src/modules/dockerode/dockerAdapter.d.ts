import * as Dockerode from 'dockerode';
import { Container } from 'dockerode';
export declare class DockerAdapter {
    name: string;
    containers: Array<Container>;
    defaultContainer: any;
    startContainer(imageName: string): Promise<{}>;
    ifExistDestroy(dockerName?: string): Promise<{}>;
    getContainerById(continerId?: any): Dockerode.Container;
    killContainer(container?: any): any;
    stopContaioner(container?: any): any;
}
