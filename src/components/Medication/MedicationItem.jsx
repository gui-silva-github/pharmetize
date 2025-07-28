import { useContext } from "react";
import { currencyFormatter } from "../../util/formatting"
import Button from "../UI/Button"
import CartContext from "../../store/CartContext"

export default function MedicationItem({medication}){
    const cartCtx = useContext(CartContext)

    function handleAddMedicationToCart(){
        cartCtx.addItem(medication)
    }

    return (
        <>
            <li className="bg-blue-950 rounded-xl overflow-hidden text-center shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
                <article className="h-full flex flex-col justify-between">
                    <img className="w-full h-80 object-center" src={`http://localhost:3000/${medication.image}`} alt={medication.name} />
                    <div>
                        <h3 className="text-2xl font-bold my-3">{medication.name}</h3>
                        <p className="inline-block bg-slate-700 text-blue-300 text-sm font-bold px-8 py-2 rounded">{currencyFormatter.format(medication.price)}</p>
                        <p className="m-4">{medication.description}</p>
                    </div>
                    <p className="mb-6">
                        <Button onClick={handleAddMedicationToCart}>Adicionar ao carrinho</Button> 
                    </p>
                </article>
            </li>
        </>
    )
}