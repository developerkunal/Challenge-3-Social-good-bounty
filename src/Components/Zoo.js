import React, { useState, useEffect } from "react";
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
  Accordion,
  Col,
} from "react-bootstrap";
import { keys } from "regenerator-runtime";
import { intro, list } from "../data";
import Big from "big.js";

const BN = require("bn.js");

const Zoo = (props) => {
  const [userHasNFT, setUserHasNFT] = React.useState(false);
  const [amount, setAmount] = useState(1);
  const [food, setFood] = useState(0);
  const [feed, setFeed] = useState(0);
  const Donate = async () => {
    await window.contract.nft_mint(
      {
        token_id: `${window.accountId}-showcode-donation-nft`,
        receiver_id: window.accountId,
      },
      300000000000000, // attached GAS (optional)
      new BN(
        Big(2)
          .times(10 ** 24)
          .toFixed()
      )
    );
  };
  const Buyfood = async () => {
    await window.contract.buy_food(
      {
        token_id: `${window.accountId}-showcode-donation-nft`,
      },
      300000000000000, // attached GAS (optional)
      new BN(
        Big(amount)
          .times(10 ** 24)
          .toFixed()
      )
    );
  };
  const feedanimals = async () => {
    await window.contract.feed(
      {
        token_id: `${window.accountId}-showcode-donation-nft`,
      },
      300000000000000 // attached GAS (optional)
    );
    checkattribute();

  };
  useEffect(() => {
    const checktoken = async () => {
      const hasToken = await window.contract.check_token({
        id: `${window.accountId}-showcode-donation-nft`,
      });
  
      if (window.accountId !== "") {
        setUserHasNFT(hasToken);
     
      }
    };
    checktoken();
  }, []);
  const checkattribute = async () => {
    const attributes = await window.contract.get_attributes({
      token_id: `${window.accountId}-showcode-donation-nft`,
    });
    if (window.accountId !== "") {
      setFeed(attributes.feed);
      setFood(attributes.food);
    }
  };
  if (userHasNFT) {
      const checkattribute = async () => {
        const attributes = await window.contract.get_attributes({
          token_id: `${window.accountId}-showcode-donation-nft`,
        });
        if (window.accountId !== "") {
          setFeed(attributes.feed);
          setFood(attributes.food);
        }
      };
      checkattribute();
  }
  function handleChange(event) {
    setAmount(event.target.value);
  }
  return (
    <Card style={{ padding: "3vh" }}>
      <Alert>
        <center>
          You can save an innocent life, donate food for an animal in need
          today.<br></br>
          {!userHasNFT && (
            <Button variant="outline-primary" onClick={Donate}>
              Donate Now
            </Button>
          )}
        </center>
      </Alert>

      {userHasNFT && (
        <>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Food</InputGroup.Text>
            <Form.Control
              placeholder="Each Food Worth 1 Near"
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="number"
              min={1}
              value={amount}
              onChange={handleChange}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={Buyfood}
            >
              Buy Food Now
            </Button>
          </InputGroup>
        </>
      )}
      <Alert>
        <center>
          {" "}
          You Have {food} Food Left and you have Feed {feed} animals.
        </center>
      </Alert>
      <Row xs={1} md={3} className="g-4">
        {list.map((_, idx) => (
          <Col>
            <Card style={{ width: "18rem" }} key={_.id}>
              <Card.Text>
                <Card.Footer>
                  Speed : {_.speed}
                  <br></br>
                  weight : {_.weight}
                </Card.Footer>
              </Card.Text>
              <Card.Img variant="top" src={_.img_url} />

              <Card.Body>
                <Card.Title>{_.title}</Card.Title>
                <Card.Text>
                  <Accordion>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Description</Accordion.Header>
                      <Accordion.Body>{_.description}</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Life Span</Accordion.Header>
                      <Accordion.Body>{_.lifespan}</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Facts</Accordion.Header>
                      <Accordion.Body>
                        {_.facts.map((item) => (
                          <li>{item}</li>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Text>
                <Card.Footer>
                  <center>
                    {food > 0 ? (
                      <Button onClick={feedanimals}>Feed</Button>
                    ) : (
                      <Button disabled>No food</Button>
                    )}
                  </center>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

Zoo.propTypes = {};

export default Zoo;
