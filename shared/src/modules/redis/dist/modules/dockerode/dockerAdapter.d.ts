import { Container } from 'dockerode';
export declare class DockerAdapter {
    name: string;
    containers: Array<Container>;
    defaultContainer: any;
    private docker;
    startContainer(imageName: any, exposePort: any, containerName?: any): Promise<{}>;
    ifExistDestroy(dockerName?: string): Promise<{}>;
    getContainerById(continerId?: any): any;
    killContainer(container?: any): any;
    stopContaioner(container?: any): any;
}
