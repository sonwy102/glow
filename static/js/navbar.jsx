const NavBar = (props) => {
  
  return (
    <Navbar className="navbar-transparent">
      {/* <Nav className="navbar-transparent"> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Brand href="/">
            <Image
              cloudName="sonwy102"
              publicId="logo/Glow_ijb8hu.svg"
              width="80em"
            ></Image>
          </Navbar.Brand>
          <Nav className="mr-sm-2">
            <ProductSearch
              searchTerms={props.searchTerms}
              setSearchParams={props.setSearchParams}
            />
          </Nav>
        </Navbar.Collapse>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          {props.isLoggedIn ? (
            <Nav className="mr-sm-2">
              <Nav.Link href={`/dashboard?user=${props.isLoggedIn}`}>
                Dashboard
              </Nav.Link>
              <LogOutBtn ensureLogIn={props.ensureLogIn}></LogOutBtn>
            </Nav>
          ) : (
            <Nav className="mr-sm-2">
              <Nav.Link href="/register">Sign Up</Nav.Link>
              <LogInBtn ensureLogIn={props.ensureLogIn}></LogInBtn>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    // </Navbar>
  );
}