export default function Input({label, type = "text", ...props}){
    return(
        <div className="mb-4">
            <label className="block mb-1 font-medium text-slate-200">{label}</label>
            <input
            type = {type}
            className="w-full border-green-50 rounded py-2 px-3 focus:ring focus:ring-blue-200 bg-gray-200"
            {...props}
            />
        </div>
    )
}