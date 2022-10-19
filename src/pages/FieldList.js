// import { Title } from "../styled"
// import { Link } from "react-router-dom"
import { LinkWord } from "../styled";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadFieldsThunk } from "../store/view/thunks";
import { selectFieldsList } from "../store/view/selectors";
import { FieldBlock } from "../components";

export const FieldList = () => {
  const dispatch = useDispatch();
  const fields = useSelector(selectFieldsList);

  useEffect(() => {
    dispatch(loadFieldsThunk());
  }, [dispatch]);

  return (
    <Container>
      <h3>Fields List:</h3>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {fields.map((x) => (
          <FieldBlock key={x.id} item={x} />
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
`;
