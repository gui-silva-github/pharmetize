import { useContext } from "react";
import Modal from "../UI/Modal"
import CartContext from "../../store/CartContext"
import { currencyFormatter } from "../../util/formatting"
import Button from "../UI/Button"
import UserProgressContext from "../../store/UserProgressContext"
import CartItem from "./CartItem"

export default function Cart(){

    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => 
        totalPrice + item.quantity * item.price
    , 0)

    function handleCloseCart(){
        userProgressCtx.hideCart()
    }

    function handleGoToCheckout(){
        userProgressCtx.showCheckout()
    }

    return <Modal className="cart"
            open={userProgressCtx.progress === 'cart'}
            onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
        >
            <h2>Seu carrinho</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem 
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="flex justify-end my-8 text-[1.15rem] font-bold text-blue-950">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Fechar</Button>
                {cartCtx.items.length > 0 && (
                    <Button onClick={handleGoToCheckout}>Finalizar compra</Button>
                )}
            </p>
    </Modal>

}