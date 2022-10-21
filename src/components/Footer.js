import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";
import { logOut } from "../store/user/slice";
import { Link, useNavigate } from "react-router-dom";

export const Footer = () => {
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
      <p style={{ color: "yellow" }}>
        <span style={{ fontSize: "0.8em" }}>made by</span> Paranoid Reptiloid
      </p>
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

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
