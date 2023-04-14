import { Children } from "react";
import { Offcanvas, Button } from "react-bootstrap";

export default function SideBar({title, show, handleClose, children}) {
  return (
    <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {children}
        </Offcanvas.Body>
    </Offcanvas>
  )
}
