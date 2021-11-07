import Card from "react-bootstrap/Card"

const TodaysSessions = (params) => {
    return(
        <Card style={{ width: '18rem', height : '300px',backgroundColor : '#6C09E2'}}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body style ={{background : 'lightBlue',margin: '20px', borderRadius : '5px'}}>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <button variant="primary">Go somewhere</button>
            </Card.Body>
        </Card>
    )
}
export default TodaysSessions