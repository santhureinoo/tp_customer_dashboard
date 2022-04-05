import React from "react";
import { v4 as uuidv4 } from 'uuid';
import rfdc from 'rfdc';
import { on } from "events";
const cloneDeep = rfdc();

interface Props {
    uploadedFiles: File[];
    setUploadedFiles(uploadeFiles: File[]): void;
}

const FileUpload = ({ uploadedFiles, setUploadedFiles }: Props) => {
    let fileReader :any;
    const fileListElemRef = React.useRef<HTMLUListElement>(null);
    const [loadedImgs, setLoadedImgs] = React.useState<JSX.Element[]>([]);

    React.useEffect(()=>{
        fileReader = new FileReader();
        fileReader.onload = function () {
            if (fileListElemRef.current) {
                const clonedLoadedImgs = cloneDeep(loadedImgs);
                clonedLoadedImgs.push(<li> <img src={fileReader.result as string} /> </li>)
                setLoadedImgs(clonedLoadedImgs);
            }
        }
    },[])

    const handleUploadFile = React.useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.currentTarget.files) {
            const uploadedFileArray = Array.from(e.currentTarget.files);
            const clonedUploadedFiles = [...cloneDeep(uploadedFiles), ...uploadedFileArray];
            uploadedFileArray.forEach(file => fileReader.readAsDataURL(file as Blob));
            setUploadedFiles(clonedUploadedFiles);
        }
    },[]);

    return (
        <React.Fragment>
            <div className="flex flex-row divide-x divide-dashed border-2 border-gray-300 border-dashed hover:border-gray-400">
                <label
                    className="flex justify-center w-full h-32 px-4 transition bg-white  rounded-md appearance-none cursor-pointer focus:outline-none">
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
                    <input onChange={handleUploadFile} type="file" name="file_upload" className="hidden" />
                </label>
                <ul ref={fileListElemRef}>
                    {loadedImgs}
                </ul>
            </div>

        </React.Fragment>
    )
}

export default FileUpload;