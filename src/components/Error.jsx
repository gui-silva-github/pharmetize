export default function Error({title, message}){
    return (
        <div className="w-[90%] max-w-[25rem] mx-auto my-8 p-4 bg-[#f9b8b8] text-[#6d0b0b] rounded-[6px]">
            <h2 className="m-0">{title}</h2>
            <p className="m-0">{message}</p>
        </div>
    )
}