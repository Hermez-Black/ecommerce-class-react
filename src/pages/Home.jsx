import { useEffect } from "react";
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk } from "../store/slices/products.slice";

export default function Home() {
    // Pure CSS Loaders loading.io/css/
    const products = useSelector( state => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductsThunk());
    }, []);
  return (
    <div>
        <Container>
            <Row xs={1} md={2} lg={3} className="py-3">
                {
                    products.map(
                        (product) => {
                            return (
                                <Col key={product.id}>
                                    <Card>
                                        <Card.Img
                                            variant="top"
                                            src={product?.images[0].url}
                                            style={{
                                                height: 300,
                                                objectFit: "cover"
                                            }} />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                            <Card.Text style={{
                                                overflowY: "scroll",
                                                height: 150
                                            }}>
                                                {product.description}
                                            </Card.Text>
                                            <Button variant="primary">Ver producto</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        }
                    )
                }
            </Row>
        </Container>
    </div>
  )
}
