import Button from "./UI/Button"
import logoImg from "../assets/logo.jpg"
import { useContext } from "react"
import CartContext from "../store/CartContext"
import UserProgressContext from "../store/UserProgressContext"

export default function Header(){
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    const totalCartItems = cartCtx.items.reduce(
        (totalNumberOfItems, item) => {
            return totalNumberOfItems + item.quantity
    }, 0)

    function handleShowCart(){
        userProgressCtx.showCart()
    }

    return (
        <header id="main-header" className="flex justify-between items-center px-[10%] py-12">
            <div className="flex gap-4 items-center">
                <img className="w-16 h-16 object-contain rounded-full border-[2px] border-[#ffc404]" src={logoImg} alt="Pharmetize" />
                <h1>Pharmetize</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Carrinho ({totalCartItems})</Button>
            </nav>
        </header>
    )
}