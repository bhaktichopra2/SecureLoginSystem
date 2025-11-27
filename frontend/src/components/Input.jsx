export default function Input({label, type = "text", ...props}){
    return(
        <div className="mb-4">
            <label className="block mb-1 font-medium">{label}</label>
            <input
            type = {type}
            className="w-full border rounded py-2 px-3 focus:ring focus:ring-blue-500"
            {...props}
            />
        </div>
    )
}