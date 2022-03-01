import React, { useState } from "react";
import Button from "../Button/Button";
import {getHelloWorldContent} from "../../services/AudioAnalysisService";
import "./HelloWorld.css";

const HelloWorld = () =>{
    const [helloData,setHelloData] = useState<string>("");
    const [helloButtonLoading,setHelloButtonLoading] = useState<boolean>(false);
  
    const handleGetDataClick = async () =>{
        setHelloButtonLoading(true);
        const apiResult = await getHelloWorldContent();    
        setHelloData(apiResult.data || "Error Reading data from API");
        setHelloButtonLoading(false);
      };

    return(
        <>
            <div className="helloworld-button">
                <Button isLoading={helloButtonLoading} displayName="Hello" variant="secondary" onClickAction={() =>handleGetDataClick() }/>
            </div>
            {    helloData &&        
                <div className="helloworld-button">
                    <Button displayName="Clear" variant="secondary" onClickAction={async () => setHelloData("") }/>
                </div>
            }
            <div>
                {`Data received from server: ${helloData}`}
            </div>

        </>
    )
};

export default HelloWorld;