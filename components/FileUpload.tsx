import React from "react";
import { v4 as uuidv4 } from 'uuid';
import rfdc from 'rfdc';
import Image from 'next/image';
import { bytesToSize, truncateFileName } from "../common/helper";
const cloneDeep = rfdc();

interface Props {
    uploadedFiles: File[];
    setUploadedFiles(uploadeFiles: File[]): void;
}

const FileUpload = ({ uploadedFiles, setUploadedFiles }: Props) => {
    const [objectUrls, setObjectUrls] = React.useState<{ file: File, objectURL: string }[]>([]);

    const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.currentTarget.files) {
            const uploadedFileArray = Array.from(e.currentTarget.files);
            const clonedUploadedFiles = [...uploadedFileArray, ...uploadedFiles];
            const clonedObjectUrls = [...objectUrls];
            uploadedFileArray.forEach(file => {
                clonedObjectUrls.push({ file: file, objectURL: URL.createObjectURL(file as Blob) })
            });
            setUploadedFiles(clonedUploadedFiles);
            setObjectUrls(clonedObjectUrls);
        }
    };

    const ImageList = React.useMemo(() => {
        return objectUrls.map(url => {
            return (<li key={uuidv4()} className="flex flex-row items-center justify-between gap-x-2">
                <div className="flex flex-row gap-x-2">
                    <Image height={'40'} width={'60'} alt="ImageNotFound" src={url.objectURL} className="object-scale-down" />
                    <div className="text-sm flex flex-col">
                        <span>{truncateFileName(url.file.name, 7)}</span>
                        <span>{bytesToSize(url.file.size)}</span>
                    </div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25">
                        <g stroke="null">
                            <path
                                fill="#84D3DB"
                                fillRule="evenodd"
                                stroke="#fff"
                                d="M12.3 0c6.794 0 12.3 5.507 12.3 12.3 0 6.794-5.506 12.3-12.3 12.3C5.507 24.6 0 19.095 0 12.3 0 5.507 5.507 0 12.3 0h0zM6.86 12.628c.165-.957 1.257-1.49 2.118-.971.079.046.153.102.223.165l.007.007c.386.37.82.756 1.25 1.138l.368.331 4.372-4.587c.261-.273.452-.45.844-.538 1.342-.296 2.285 1.344 1.334 2.346l-5.45 5.719c-.513.548-1.43.598-1.982.075-.317-.294-.66-.593-1.008-.895-.602-.523-1.217-1.057-1.717-1.585-.3-.3-.43-.792-.36-1.205h0z"
                                clipRule="evenodd"
                            ></path>
                        </g>
                    </svg>
                </div>
            </li >);
        })
    }, [objectUrls])

    return (
        <React.Fragment>
            <div className="flex flex-row divide-x divide-dashed border-2 border-gray-300 border-solid rounded-lg hover:border-gray-400">
                <label
                    className="flex justify-center w-1/2 h-32 px-4 transition bg-white  rounded-md appearance-none cursor-pointer focus:outline-none">
                    <span className="flex flex-col justify-center items-center my-auto space-x-2">
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
                    <input accept="image/*" onChange={handleUploadFile} type="file" name="file_upload" className="hidden" />
                </label>
                <ul className='w-1/5 p-4 flex-1 space-y-2'>
                    {ImageList}
                </ul>
            </div>
        </React.Fragment>
    )
}

export default FileUpload;