import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Card,
  Button,
  Row,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { login, logout } from "../utils";

const Profile = (props) => {
  const [metadata, setMetadata] = useState();
  useEffect(() => {
    const token_metadata = async () => {
      if (window.accountId !== "") {
        setMetadata(
          await window.contract.nft_token({
            token_id: `${window.accountId}-showcode-challenge`,
          })
        );
      }
    };
    token_metadata();
  }, []);
  console.log(metadata);
  return (
    <Card style={{ padding: "3vh" }}>
      <center>
        User Profile
        {metadata && (
          <Card bg="light" style={{ width: "40rem" }}>
            <Card.Img variant="top" src={metadata.metadata.media} />

            <Card.Header>Username : - {metadata.owner_id}</Card.Header>
            <Card.Body>
              <Card.Title>User Details</Card.Title>

              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  User Operating System : {metadata.metadata.os}
                </ListGroupItem>
                <ListGroupItem>
                  User Frontend Language: {metadata.metadata.frontend}
                </ListGroupItem>
                <ListGroupItem>
                  User Backend Language: {metadata.metadata.backend}
                </ListGroupItem>
                <ListGroupItem>
                  User Skills: {metadata.metadata.skill1} ,{" "}
                  {metadata.metadata.skill2}
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
            <Card.Body>
              <Card.Link href={`https://github.com/${metadata.metadata.github}`}>Github</Card.Link>
              <Card.Link href={`https://twitter.com/${metadata.metadata.twitter}`}>Twitter</Card.Link>
              <Card.Link href={`https://app.showcode.io/profile/${metadata.metadata.showcode}`}>Showcode</Card.Link>

            </Card.Body>
          </Card>
        )}
      </center>
    </Card>
  );
};

Profile.propTypes = {};

export default Profile;
