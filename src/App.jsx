import Header from "./components/Header"
import Medications from "./components/Medication/Medications"
import Cart from "./components/Cart/Cart"
import Checkout from "./components/Checkout/Checkout"
import { CartContextProvider } from "./store/CartContext"
import { UserProgressContextProvider } from "./store/UserProgressContext"

function App() {

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Medications />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  )
}

export default App
