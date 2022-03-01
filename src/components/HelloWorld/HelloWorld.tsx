import React, { useState } from "react";
import Col from "react-bootstrap/Col";
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
            <Col md="10" xs="10">
                <div className="hello-button">
                    <Button isLoading={helloButtonLoading} displayName="Hello World" variant="secondary" onClickAction={() =>handleGetDataClick() }/>
                </div>
                
                <Button displayName="Clear" variant="secondary" onClickAction={async () => setHelloData("") }/>
            </Col>
            <Col md="10" xs="10">
                {`Data received from server: ${helloData}`}
            </Col>
        </>
    )
};

export default HelloWorld;