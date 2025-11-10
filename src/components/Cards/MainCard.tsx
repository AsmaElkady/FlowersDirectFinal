import Card from "react-bootstrap/Card";
import type { ICardProps } from "../../types/components/CardProps";

const MainCard = ({ title, number, time }: ICardProps) => {
  return (
    <div
      className="border-card border-1 p-1 rounded-3"
      style={{ width: "18rem" }}
    >
      <Card border="primary">
        <Card.Body>
          <Card.Title className="text-primary">{title}</Card.Title>
          <Card.Text>{number}</Card.Text>
          <Card.Text>{time}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MainCard;
