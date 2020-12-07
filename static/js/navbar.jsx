const NavBar = (props) => {
  
  return (
    <Navbar bg="light" fixed="top">
      <Navbar.Collapse id="basic-navbar-nav">
        {props.isLoggedIn ? (
          <Navbar.Brand href={`/dashboard?user=${props.isLoggedIn}`}>
            <Image
              cloudName="sonwy102"
              publicId="logo/Glow_ijb8hu.svg"
              width="80em"
            ></Image>
          </Navbar.Brand>
        ) : (
          <Navbar.Brand href="/">
            <Image
              cloudName="sonwy102"
              publicId="logo/Glow_ijb8hu.svg"
              width="80em"
            ></Image>
          </Navbar.Brand>
        )}

        <Nav>
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
            <LogOutBtn ensureLogIn={props.ensureLogIn}></LogOutBtn>
          </Nav>
        ) : (
          <Nav className="mr-sm-2">
            <LogInBtn ensureLogIn={props.ensureLogIn}></LogInBtn>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}