import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container"
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk, filterCategoriesThunk, searchByTextThunk, CATEGORIES_URL } from "../store/slices/products.slice";
import axios from "axios";
import { Link } from "react-router-dom";
import { addItemToCartThunk } from "../store/slices/itemsCart.slice";

export default function Home() {
    // Pure CSS Loaders loading.io/css/
    const products = useSelector( state => state.products);
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [textToSearch, setTextToSearch] = useState("");

    useEffect(() => {
        dispatch(getProductsThunk());
        axios
            .get(CATEGORIES_URL)
            .then(res => setCategories(res.data))
            .catch(err => console.error(err))
    }, []);

    const handlerSelectChange = (event) => {
        const id = event.target.value;
        if (parseInt(id) === 0) {
            dispatch(getProductsThunk());
        } else {
            dispatch(filterCategoriesThunk(id));
        }
    }

    const handlerInputSearch = (e) => {
        setTextToSearch(e.target.value);
    }

    const searchProductsByText = () => {
        dispatch(searchByTextThunk(textToSearch));
    }

    const addToCart = (id) => {
        const data = {
          quantity: 1,
          productId: id
        };
        dispatch(addItemToCartThunk(data));
      }

  return (
    <div>
        <Container>
            <Row xs={1} md={2} lg={2} className="filters">
                <Col>
                    <h3>Filtrar por:</h3>
                    <Form.Select size="lg" onChange={handlerSelectChange}>
                        <option value="0">
                            Todos
                        </option>
                        { categories.map(
                            (category) => {
                                const { id, name } = category;
                                return (
                                    <option key={id} value={`${id}`}>
                                        { name }
                                    </option>
                                );
                            }
                        ) }
                    </Form.Select>
                </Col>
                <Col className="filterByInput">
                    <h3>¿Qué te gustaría buscar?</h3>
                    <input
                        className="w-100 form-control me-sm-2"
                        style={{
                            height: 45,
                        }}
                        type="text"
                        onChange={handlerInputSearch}
                        placeholder="samsung, sony, etc..."/>
                    <Button
                        variant="success"
                        className="buttonInput"
                        onClick={searchProductsByText}>
                        Buscar
                    </Button>
                </Col>
            </Row>
            <Row xs={1} md={2} lg={3} className="py-3">
                {
                    products.map(
                        (product) => {
                            const { title } = product;
                            const titleText = title.substring(0,30);
                            const finalTitle = `${titleText}...`
                            return (
                                <Col key={product.id}>
                                    <Card
                                        style={{
                                            display: "grid",
                                            placeItems: "center",
                                            marginTop: 10
                                        }}
                                        as={Link}
                                        to={`/product-detail/${product.id}`}>
                                        <Card.Img
                                            variant="top"
                                            src={product?.images[0].url}
                                            style={{
                                                display: "block",
                                                width: "80%",
                                                height: "250px",
                                                objectFit: "contain",
                                                padding: 10
                                            }} />
                                        <Card.Body style={{
                                            width: "100%",
                                        }}
                                        className="text-left">
                                            <Row>
                                                <Col>
                                                    <Card.Title style={{
                                                        fontSize: 16,
                                                        textDecoration: "none",
                                                    }}>{finalTitle}</Card.Title>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Card.Text style={{
                                                        textDecoration: "none !important",
                                                    }}>
                                                        price: ${product.price}
                                                    </Card.Text>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        variant="primary"
                                                        className="button-cart"
                                                        onClick={() => addToCart(product.id)}>
                                                            <img src="lista-de-deseos.png" alt="cart" style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                zIndex: 100
                                                            }}/>
                                                    </Button>
                                                </Col>
                                            </Row>
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
