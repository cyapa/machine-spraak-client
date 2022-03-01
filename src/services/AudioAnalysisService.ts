import Amplify, { API } from "aws-amplify";

const RESOURCES = {

  HelloWorldResource:
    {
      name: "HelloWorldAPI",
      endpoint: "http://127.0.0.1:3000",
    },
  AudioAnalysisResource:
    {
      name: "machinespraak_api",
      endpoint: process.env.REACT_APP_API_URL,
    }
};

Amplify.configure({
    API: {
      endpoints: [
        RESOURCES.AudioAnalysisResource,
        RESOURCES.HelloWorldResource
      ],
    },
});


type APIResult = Readonly<{
  data:string| null;
  error:string | null;
}>;

async function getHelloWorldContent():Promise<APIResult>{
    try{
      const init = {
        response: true,
      };
        const result =  await API.get(RESOURCES.HelloWorldResource.name, "/hello_world_example",init);
        return result;
    }
    catch{
        return {data:null,error:"SERVER_ERROR"};
    }
};

async function postFile(file:any):Promise<string>{
  try{
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file_name", file.name);
    const content = {
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return await API.post(RESOURCES.AudioAnalysisResource.name, "/audio_analysis",content);

  }
  catch{
      return "SERVER_ERROR";
  }
};


export  {getHelloWorldContent,postFile};