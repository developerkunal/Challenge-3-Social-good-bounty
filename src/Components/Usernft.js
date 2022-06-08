import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { keys } from "regenerator-runtime";
const BN = require("bn.js");

const Usernft = (props) => {
  const [message2, setMessage2] = useState("");
  const [state, setState] = React.useState({
    os: "Windows",
    frontend: "ReactJs",
    backend: "NodeJs",
    skill1: "Gaming",
    skill2: "Data Structures",
    github: "",
    twitter: "",
    showcode: "",
    error:""
  });
  const [loading, setLoading] = useState(false);
  var serializedSVG = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350" enable-background="new 0 0 400 327" xml:space="preserve"><style>.base { fill: Blue; font-family:ff-market-web, cursive ; font-size: 14px; }</style><rect width="100%" height="100%" fill="white" /><rect fill="#DEF2FD" width="400" height="327"/>
  <polygon opacity="0.2" fill="#7DACDC" enable-background="new    " points="0,327 200,173.797 400,327 "/>
  <polygon opacity="0.2" fill="#7DACDC" enable-background="new    " points="91,327 291,280.292 491,327 "/>
  <polygon opacity="0.2" fill="#7DACDC" enable-background="new    " points="-101,327 99,201 299,327 "/>
  <path xmlns="http://www.w3.org/2000/svg" transform="translate(250,50)" 
  d="M72.2,4.6L53.4,32.5c-1.3,1.9,1.2,4.2,3,2.6L74.9,19c0.5-0.4,1.2-0.1,1.2,0.6v50.3c0,0.7-0.9,1-1.3,0.5l-56-67  C17,1.2,14.4,0,11.5,0h-2C4.3,0,0,4.3,0,9.6v70.8C0,85.7,4.3,90,9.6,90c3.3,0,6.4-1.7,8.2-4.6l18.8-27.9c1.3-1.9-1.2-4.2-3-2.6  l-18.5,16c-0.5,0.4-1.2,0.1-1.2-0.6V20.1c0-0.7,0.9-1,1.3-0.5l56,67c1.8,2.2,4.5,3.4,7.3,3.4h2c5.3,0,9.6-4.3,9.6-9.6V9.6  c0-5.3-4.3-9.6-9.6-9.6C77.1,0,74,1.7,72.2,4.6z"/>
  <text x="10" y="20" class="base"> 
  ${state.os}
  </text><text x="10" y="40" class="base">
  ${state.frontend}
  </text><text x="10" y="60" class="base">
  ${state.backend}
  </text><text x="10" y="80" class="base">
  ${state.skill1}
  </text><text x="10" y="100" class="base">
  ${state.skill2}
  </text><text x="10" y="120" class="base">
  Github - ${state.github}
  </text><text x="10" y="140" class="base">
  Twitter- ${state.twitter}
  </text><text x="10" y="160" class="base">
  Showcode - ${state.showcode}
  </text>
  <text x="10" y="180" class="base">
  Near account - ${window.accountId}
  </text>
  </svg>
  `;

  var base64Data = window.btoa(serializedSVG);
  const usernft = async () => {
    setLoading(true);
    if(state.github && state.showcode && state.twitter ){
    await window.contract.nft_mint(
      {
        token_id: `${window.accountId}-showcode-challenge`,
        metadata: {
          title: "Near Showcode User Nft",
          description: "Challenge #2 NFT+Frontend. It store all user info in metadata as profile data",
          media:
          "data:image/svg+xml;base64," + base64Data,
          os:state.os,
          frontend:state.frontend,
          backend:state.backend,
          skill1:state.skill1,
          skill2:state.skill2,
          github:state.github,
          showcode:state.showcode,
          twitter:state.twitter
        },
        receiver_id: window.accountId,
      },
      300000000000000, // attached GAS (optional)
      new BN("1000000000000000000000000")
    );
  }else{
    setState({
      ...state,
      ["error"]:
        "Fill All Text fields",
    });  }
  };
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }
  

  return (
    <Card style={{ padding: "2vh" }}>
      <Container>
        <Row style={{ marginBottom: "2vh" }}></Row>
        <Row className="d-flex justify-content-center">
          <Alert variant="primary">
            <center>Get Your User Pass Now</center>{" "}
          </Alert>
          <p> Step 2 : Fill Your Details</p>

          <Form>
            <Form.Label>1. Which Operating System Do you Use?</Form.Label>
            <div className="mb-3">
              <Form.Check
                inline
                label="Windows"
                name="os"
                type="radio"
                id="inline-radio-1"
                value="Windows"
                checked={state.os === "Windows"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Mac OS"
                name="os"
                type="radio"
                id="inline-radio-2"
                value="Mac OS"
                checked={state.os === "Mac OS"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Linux"
                name="os"
                type="radio"
                id="inline-radio-2"
                value="Linux"
                checked={state.os === "Linux"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Android"
                name="os"
                type="radio"
                id="inline-radio-2"
                value="Android"
                checked={state.os === "Android"}
                onChange={handleChange}
              />
            </div>
            <Form.Label>2. Which Frontend Language do you work on?</Form.Label>
            <div className="mb-3">
              <Form.Check
                inline
                label="ReactJs"
                name="frontend"
                type="radio"
                id="inline-radio-1"
                value="ReactJs"
                checked={state.frontend === "ReactJs"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="NextJs"
                name="frontend"
                type="radio"
                id="inline-radio-2"
                value="NextJs"
                checked={state.frontend === "NextJs"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Django"
                name="frontend"
                type="radio"
                id="inline-radio-2"
                value="Django"
                checked={state.frontend === "Django"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Angular"
                name="frontend"
                type="radio"
                id="inline-radio-2"
                value="Angular"
                checked={state.frontend === "Angular"}
                onChange={handleChange}
              />
            </div>
            <Form.Label>3. Which Backend Language do you work on?</Form.Label>
            <div className="mb-3">
              <Form.Check
                inline
                label="NodeJs"
                name="backend"
                type="radio"
                id="inline-radio-1"
                value="NodeJs"
                checked={state.backend === "NodeJs"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Python"
                name="backend"
                type="radio"
                id="inline-radio-2"
                value="Python"
                checked={state.backend === "Python"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="PHP"
                name="backend"
                type="radio"
                id="inline-radio-2"
                value="PHP"
                checked={state.backend === "PHP"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Java"
                name="backend"
                type="radio"
                id="inline-radio-2"
                value="Java"
                checked={state.backend === "Java"}
                onChange={handleChange}
              />
            </div>
            <Form.Label>4. Which Other Skills you have?</Form.Label>
            <div className="mb-3">
              <Form.Check
                inline
                label="Copy Writing"
                name="skill1"
                type="radio"
                id="inline-radio-2"
                value="Copy Writing"
                checked={state.skill1 === "Copy Writing"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Gaming"
                name="skill1"
                type="radio"
                id="inline-radio-2"
                value="Gaming"
                checked={state.skill1 === "Gaming"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Event Management"
                name="skill1"
                type="radio"
                id="inline-radio-2"
                value="Event Management"
                checked={state.skill1 === "Event Management"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Hacking"
                name="skill1"
                type="radio"
                id="inline-radio-2"
                value="Hacking"
                checked={state.skill1 === "Hacking"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Dancing"
                name="skill1"
                type="radio"
                id="inline-radio-2"
                value="Dancing"
                checked={state.skill1 === "Dancing"}
                onChange={handleChange}
              />
            </div>
            <Form.Label>5. Which Other Skills you have?</Form.Label>
            <div className="mb-3">
              <Form.Check
                inline
                label="Mathematical aptitude"
                name="skill2"
                type="radio"
                id="inline-radio-2"
                value="Mathematical aptitude"
                checked={state.skill2 === "Mathematical aptitude"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Problem-solving skills"
                name="skill2"
                type="radio"
                id="inline-radio-2"
                value="Problem-solving skills"
                checked={state.skill2 === "Problem-solving skills"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Data Structures"
                name="skill2"
                type="radio"
                id="inline-radio-2"
                value="Data Structures"
                checked={state.skill2 === "Data Structures"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Databases Management"
                name="skill2"
                type="radio"
                id="inline-radio-2"
                value="Databases Management"
                checked={state.skill2 === "Databases Management"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Sourcecode testing"
                name="skill2"
                type="radio"
                id="inline-radio-2"
                value="Sourcecode testing"
                checked={state.skill2 === "Sourcecode testing"}
                onChange={handleChange}
              />
            </div>
            <Form.Label>6. Enter Your Github Username</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={state.github}
                onChange={handleChange}
                name="github"
                required
              />
            </InputGroup>
            <Form.Label>7. Enter Your Twitter Username</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={state.twitter}
                onChange={handleChange}
                name="twitter"
                required
              />
            </InputGroup>
            <Form.Label>8. Enter Your Showcode Username</Form.Label>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={state.showcode}
                onChange={handleChange}
                name="showcode"
                required
              />
            </InputGroup>
            {state.error && (
                <p style={{ color: "red" }}>{state.error}</p>
              )}{" "}
            <Button variant="primary" onClick={usernft}>Submit</Button>
          </Form>
        </Row>
      </Container>
    </Card>
  );
};

Usernft.propTypes = {};

export default Usernft;
