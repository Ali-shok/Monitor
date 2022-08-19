import React from 'react';
import Card from 'react-bootstrap/Card';

function ChildTheme(props) {
  const { theme } = props;
  return (
    <Card>
      <Card.Img />
      <Card.Body>
        <Card.Title>{theme.Name}</Card.Title>
        <Card.Text>d make up the bulk of the card's content.</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ChildTheme;
