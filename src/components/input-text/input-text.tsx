interface Type{
    type:string;
    name:string;
    label:string;
    action: React.Dispatch<React.SetStateAction<string>>
}
function InputText({name,type,label,action}:Type) {

    let handleInput = (event:React.ChangeEvent<HTMLInputElement>)=>{
        action(event.target.value)
    }

    return (
        <div className="relative z-0 w-full mb-5 group">
            <input onChange={handleInput} type={type} name={name} id={name} className="block p-5 pb-2 pl-4 pr-4 w-full text-lg text-white border border-gray-100 border-1 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black peer" placeholder=" " autoComplete="false" required />
            <label htmlFor={name} className="absolute cursor-text text-gray-300 top-2 text-xs left-4 transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:top-4">{label}</label>
        </div>
    )
}

export default InputText
