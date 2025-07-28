import { useContext, useActionState } from "react";
import Modal from "../UI/Modal"
import CartContext from "../../store/CartContext"
import { currencyFormatter } from "../../util/formatting"
import Input from "../UI/Input"
import Button from "../UI/Button"
import Error from "../Error"
import UserProgressContext from "../../store/UserProgressContext"
import useHttp from "../../hooks/useHttp"

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Checkout(){

    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig)

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    )

    function handleClose(){
        userProgressCtx.hideCheckout()
    }

    function handleFinish(){
        userProgressCtx.hideCheckout()
        cartCtx.clearCart()
        clearData()
    }

    async function checkoutAction(prevState, fd){
        const customerData = Object.fromEntries(fd.entries())

        await sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }))
    }

        const [formState, formAction, pending] = useActionState(checkoutAction, null)

        let actions = (
            <>
                <Button type="button" textOnly onClick={handleClose}>Fechar</Button>
                <Button>Enviar pedido</Button>
            </>
        )

        if (pending){
            actions = <span>Enviando dados do pedido...</span>
        }

        if (data && !error){
            return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
                <div className="center success">
                    <h2>Sucesso!</h2>
                    <p>Pedido enviado ao Pharmetize.</p>
                </div>
                <p className="modal-actions finish">
                    <Button onClick={handleFinish}>
                        OK
                    </Button>
                </p>
            </Modal>
        }

    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
        <form action={formAction}>
            <div className="center">
                <h2>Finalizar compra</h2>
                <p>Total: {currencyFormatter.format(cartTotal)}</p>
            </div>

            <Input label="Nome completo" type="text" id="name" />
            <Input label="Email" type="email" id="email" />
            <Input label="Rua" type="text" id="street" />
            <div className="control-row">
                <Input label="CEP" type="text" id="postal-code" />
                <Input label="Cidade" type="text" id="city" />
            </div>

            {error && <Error title="Falha ao enviar o pedido." message={error} />}
        
            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>
}