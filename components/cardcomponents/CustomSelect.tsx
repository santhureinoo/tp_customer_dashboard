const CustomSelect = (): JSX.Element => {
    return (
        <div className="flex justify-center items-baseline gap-x-2">
                <label className="text-black text-custom-xs font-medium">Outlet</label>
                <select className="form-select appearance-none
      block
      mb-3 min-w-[104.68px] h-full
      px-3
      py-1.5
      text-custom-xs
      font-medium
      text-custom-gray
      bg-custom-lightgray bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      outline-none">
                    <option selected>Tanglin Mall</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
        </div>
    )
}

export default CustomSelect;