// import { Title } from "../styled"
// import { Link } from "react-router-dom"
import { LinkWord } from "../styled";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadIntroThunk } from "../store/view/thunks";
import { selectIntro } from "../store/view/selectors";

export const Homepage = () => {
  const dispatch = useDispatch();
  const intro = useSelector(selectIntro);

  useEffect(() => {
    dispatch(loadIntroThunk());
  }, [dispatch]);

  if (intro) {
    return (
      <Container>
        <img onClick={() => dispatch(loadIntroThunk())} src={intro} alt="" />
      </Container>
    );
  } else {
    return <p>LOADING</p>;
  }
};

const Container = styled.div`
  margin: 20px;
`;
