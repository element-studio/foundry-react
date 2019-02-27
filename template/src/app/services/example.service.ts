import axios from 'axios';

export interface IExampleReturnedResponse {
    id: string;
    name: string;
}

export interface IExampleRequest {
    id: string;
}

class ExampleService {
    public async getSomething(request: IExampleRequest): Promise<IExampleReturnedResponse[]> {
        let response = await axios.post('/something', request);

        return response.data;
    }
}

export const exampleservice = new ExampleService();
