import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { login, logout } from "./utils";

// React Bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

// React Bootstraps imports
import { Nav, Navbar, Container, Row, Card, Alert } from "react-bootstrap";

// Custom Components
import Usernft from "./Components/Usernft";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
// assets
import Logo from "./assets/logo-white.svg";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const [check_nft, setNftStatus] = useState(false);
 
  useEffect(() => {
    const nftstatus = async () => {

      if (window.accountId !== "") {
        

        setNftStatus(
          await window.contract.check_token({
            id: `${window.accountId}-showcode-challenge`,

          })
        );
      }
      
    };
    nftstatus();
  }, []);

  return (
    <React.Fragment>
      {" "}
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>
            <img
              alt=''
              src={Logo}
              width='30'
              height='30'
              className='d-inline-block align-top'
            />{" "}
Near Showcode Challenge            </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'></Nav>
            <Nav>
              <Nav.Link
                onClick={window.walletConnection.isSignedIn() ? logout : login}
              >
                {window.walletConnection.isSignedIn()
                  ? "Logout"
                  : "Login"}
              </Nav.Link>{" "}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        {window.walletConnection.isSignedIn() ? <Card><center><h1>You are Logged in </h1></center></Card> :
      <Login></Login>}
      {window.accountId && 
    (check_nft  ? <Profile></Profile> : <Usernft ></Usernft>)
    }</Container>
    </React.Fragment>
  );
}
