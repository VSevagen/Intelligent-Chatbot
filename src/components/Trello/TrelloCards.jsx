import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const TrelloCards = (props) => {
  const handler = () => {
    window.open(props.messageUrl, "_blank");
  };

  const optionsMarkup = props.messageData.data.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={handler}
    >
      {option.name}
    </button>
  ));

  return <Container>{optionsMarkup}</Container>;
};

export default TrelloCards;
