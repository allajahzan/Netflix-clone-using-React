interface Type{
  text:string,
}
function Button({text}:Type) {
  return (
    <button  type={"submit"} className="p-2.5 text-center bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold">{text}</button>
  )
}

export default Button
