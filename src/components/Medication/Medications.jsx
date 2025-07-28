import MedicationItem from "./MedicationItem"
import useHttp from "../../hooks/useHttp"
import Error from "../Error"

const requestConfig = {}

export default function Medications(){
    const {data: loadedMedications, isLoading, error} = 
    useHttp('http://localhost:3000/medications', requestConfig, [])

    if (isLoading){
        return <p className="text-center">Procurando remédios...</p>
    }

    if (error){
        return <Error title="Falha ao carregar remédios." message={error} />
    }

    return (
        <>
            <ul className="w-[90%] max-w-[70rem] list-none my-8 mx-auto p-4 grid gap-4 grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))]">
                {loadedMedications.map(medication => 
                    <MedicationItem key={medication.id} medication={medication} />
                )}
            </ul>
        </>
    )
}