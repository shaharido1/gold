import { Container } from 'dockerode';
export declare class DockerAdapter {
    name: string;
    containers: Array<Container>;
    defaultContainer: any;
    private docker;
    constructor();
    startContainer(imageName: string): Promise<{}>;
    ifExistDestroy(dockerName?: string): Promise<{}>;
    getContainerById(continerId?: any): Container;
    killContainer(container?: any): any;
    stopContaioner(container?: any): any;
}
