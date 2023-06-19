
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props)=>{
return <div className={classes.backdrop} onClick={props.closeCart}/>
}

const ModalOverLay =(props)=>{
     return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
     </div>
}



   const PortalElement = document.getElementById("overlays")
const Modal = (props)=>{
      return <>
         {ReactDom.createPortal(<Backdrop onClick={props.closeCart} /> , PortalElement)}
         {ReactDom.createPortal(<ModalOverLay >{props.children} </ModalOverLay> , PortalElement)}
      </>
}

export default Modal;