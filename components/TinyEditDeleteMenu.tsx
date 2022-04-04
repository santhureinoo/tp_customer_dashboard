const TinyEditDeleteMenu = ({ onEdit, onDelete }) => {
    return (
        <div className="block">
            <div className="bg-white border border-gray-300 rounded-lg flex flex-col text-sm py-1 px-1 text-gray-500 shadow-lg">
                <div onClick={e => onEdit()} className="flex hover:bg-gray-100 py-1 px-2 rounded">
                    <div>Edit</div>
                </div>
                <div onClick={e => onDelete()} className="flex hover:bg-gray-100 py-1 px-2 rounded">
                    <div>Delete</div>
                </div>

            </div>
        </div>
    )
}

export default TinyEditDeleteMenu;