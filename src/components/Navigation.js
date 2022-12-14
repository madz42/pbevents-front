import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";
import { logOut } from "../store/user/slice";
import { Link, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  return (
    <Nav>
      <Logo href="/">
        Pew
        <span>
          Pew<sub>pew</sub>
        </span>
      </Logo>
      <Hamburger onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu open={open}>
        <MenuLink to="/">Home</MenuLink>
        <MenuLink to="/browse">Browse</MenuLink>
        <MenuLink to="/build">Builder</MenuLink>
        {/* <MenuLink to="/plan">Planner</MenuLink> */}
        <MenuLink to="/view">Viewer</MenuLink>
        {/* <span onClick={() => navigate("/build")}>blah</span> */}
        {/* {token ? (
          <button onClick={() => dispatch(logOut())}>Logout</button>
        ) : (
          <MenuLink to="/login">Login</MenuLink>
        )} */}
      </Menu>
    </Nav>
  );
};

const MenuLink = styled(Link)`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #ffff31;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;
  font-weight: bold;

  &:hover {
    color: #ffffff;
    text-decoration: underline;
    font-weight: bold;
  }
`;

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #000000;
  /* position: absolute; */
  top: 0;
  left: 0;
  right: 0;
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: #ffff31;
  text-decoration: none;
  font-weight: 800;
  font-size: 2rem;

  span {
    font-weight: 400;
    font-size: 1.4rem;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background-color: #ffff31;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 780px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 780px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ open }) => (open ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
  }
`;
