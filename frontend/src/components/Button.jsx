export default function Button({children, ...props}){
    return(
        <button
        {...props}
        className="w-full bg-green-500 hover:bg-green-800 text-white py-2 rounded font-semibold"
        >
            {children}
        </button>
    )
}