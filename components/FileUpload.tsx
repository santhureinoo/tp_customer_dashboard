interface Props {
    className : string;
}
const FileUpload = ({className} : Props) => {
    return (
        <div className={className}>
            <label
                className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex flex-col justify-center items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="block w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="font-medium text-gray-600">
                        Drop files to Attach, or
                        <span className="text-blue-600 underline pl-3">browse</span>
                    </span>
                </span>
                <input type="file" name="file_upload" className="hidden" />
            </label>
        </div>
    )
}

export default FileUpload;