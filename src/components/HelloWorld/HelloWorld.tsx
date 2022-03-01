import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "../Button/Button";
import {getHelloWorldContent} from "../../services/AudioAnalysisService";
import "./HelloWorld.css";

const HelloWorld = () =>{
    const [helloData,setHelloData] = useState<string>("");
    const [helloButtonLoading,setHelloButtonLoading] =useState<boolean>(false);
  
    const handleHelloClick = async () =>{
        setHelloButtonLoading(true);
        const apiResult = await getHelloWorldContent();    
        setHelloData(apiResult.data || "");
        setHelloButtonLoading(false);
      };

    return(
        <>
            <Col md="10" xs="10">
                <div className="hello-button">
                    <Button isLoading={helloButtonLoading} displayName="Get Data" variant="secondary" onClickAction={() =>handleHelloClick() }/>
                </div>
                
                <Button displayName="Clear" variant="secondary" onClickAction={async () => setHelloData("") }/>
            </Col>
            <Col md="10" xs="10">
                {`Data received form server: ${helloData}`}
            </Col>
        </>
    )
};

export default HelloWorld;