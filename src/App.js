import { useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import "./App.css";
import Button from "./components/Button/Button";
import {getHelloWorldContent,postFile} from "./services/AudioAnalysisService";


const App = () => {
  const MAX_FILE_SIZE = 6000000;
  const SUPPORTED_FILE_TYPE = "audio/wav";

  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [helloData,setHelloData] = useState("");
  const [helloButtonLoading,setHelloButtonLoading] =useState(false);

  const fileInputRef = useRef();

  const handleSelectFile = (event) => {
    if (event.target.files[0].size > MAX_FILE_SIZE) {
      setError("Maximum file size is " + MAX_FILE_SIZE + " bytes");
      handleReset();
      return;
    }
    if (event.target.files[0].type !== SUPPORTED_FILE_TYPE) {
      setError("File type must be " + SUPPORTED_FILE_TYPE);
      handleReset();
      return;
    }
    setFile(event.target.files[0]);
    setResponse("");
    setError("");
  };

  const handleReset = () => {
    fileInputRef.current.value = "";
    setFile(null);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const response = await postFile(file);
      setResponse(response);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
    handleReset();
  };

  const handleHelloClick = async () =>{
    setHelloButtonLoading(true);
    const apiResult = await getHelloWorldContent();
    setHelloData(apiResult.data);
    setHelloButtonLoading(false);
  }

  return (
    <Container fluid="md">
      <Row className="justify-content-center mt-5 mb-0">
        <Col md="10" xs="10">
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>
              <h4>Upload a file</h4>
            </Form.Label>
            <Form.Control
              type="file"
              encType="multipart/form-data"
              size="lg"
              onChange={(event) => handleSelectFile(event)}
              ref={fileInputRef}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center mt-2 mb-0">
        <Col md="10" xs="10">
          <div>
            <pre>
              {file && <button onClick={handleUpload}>Upload</button>}{" "}
              {file && file.name + " " + file.size + " bytes"}
              {file && file.type && ", " + file.type}
              {response}
              {error}
            </pre>
          </div>
          <div className="mt-1">
            {loading && <Spinner animation="border" role="status" />}
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-2 mb-0">
        <Col md="10" xs="10">
          <Button isLoading={helloButtonLoading} displayName="Hello" variant="secondary" onClickAction={() =>handleHelloClick() }/>
          <Button displayName="Clear" variant="secondary" onClickAction={() =>setHelloData("") }/>
        </Col>
        <Col md="10" xs="10">
          {`Data received form server: ${helloData}`}
        </Col>
      </Row>

    </Container>
  );
};

export default App;
