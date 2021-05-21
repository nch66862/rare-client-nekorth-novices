import React, { createContext, useState } from 'react' 

export const ImageContext = createContext()

export const ImageProvider = props => {
    const [b64, setB64] = useState("")

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setB64(base64ImageString)
        });
    }

    return (
        <ImageContext.Provider value={{ createImageString, b64, setB64 }} >
            { props.children }
        </ImageContext.Provider>
    )
}
