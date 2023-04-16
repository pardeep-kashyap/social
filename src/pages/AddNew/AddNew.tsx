import { Box, TextField, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_POST, MachineContext } from "../../machine";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './AddNew.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReactGoogleAutocomplete from "react-google-autocomplete";
const AddNew = () => {
    const [currentMachine, sendToMachine] = useContext(MachineContext);
    const [image, setImage] = useState<any>(null);
    const [input, setInput] = useState<any>('');
    const [showEmojis, setShowEmojis] = useState<boolean>(false);
    const navigate = useNavigate()

    const handleChange = (event: any) => {
        if (event.target.files[0]) {
            const FR = new FileReader();
            FR.addEventListener("load", function (evt) {
                if (evt && evt.target) {
                    setImage(evt.target.result);
                }
            });

            FR.readAsDataURL(event.target.files[0]);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userData = JSON.parse(localStorage.getItem('userData') || '{}')
        const { text } = event.currentTarget;
        if (!text.value && !image) {
            return
        }
        sendToMachine(CREATE_POST, {
            caption: text.value,
            images: [image],
            author: userData.id
        })
    };

    useEffect(() => {
        if (currentMachine?.value?.posts === 'createPostSuccess') {
            navigate('/')
        }
    }, [currentMachine?.value])



    const onTextChange = (evt: Event) => {
        setInput(evt.target.value);
    }
    return (
        <div className="add-new-post">
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <div className="post-title-container">
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="text"
                        name="text"
                        autoComplete="text"
                        placeholder="Title"
                        autoFocus
                        value={input}
                        variant="standard"
                        aria-required
                        onChange={onTextChange}
                    />
                    <button className="emoji-button" >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                </div>


                <div className="image-upload">
                    {/* <label htmlFor="file-input" className="image-upload__label">
                        {image ? 'Change Image' : 'Upload Image'}
                    </label> */}
                    <div className="close">
                        {image && <HighlightOffIcon onClick={() => setImage(null)} />}
                    </div>
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="image-upload__input"
                    />
                    {image ? (
                        <img src={image} alt="uploaded" className="image-upload__preview" />
                    ) : (
                        <div className="image-upload__placeholder">
                            <label htmlFor="file-input" >
                                <AddPhotoAlternateIcon sx={{ width: "100%", height: "100%", color: "lightgray" }} />

                            </label>
                            {/* <img src="https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=624%2C421&ssl=1" alt="placeholder" /> */}
                        </div>
                    )}
                </div>
                <div className="location_container">
                    <LocationOnIcon /> <ReactGoogleAutocomplete
                        style={{ width: "90%" }}
                        className="location_input"
                        onPlaceSelected={(place) => {
                            console.log(place);
                        }}
                        options={{
                            types: ["(regions)"],
                            componentRestrictions: { country: "ru" },
                        }}
                        defaultValue="Amsterdam"
                        apiKey={''}
                    />

                </div>



                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add
                </Button>

            </Box >
        </div >
    )
}
export default AddNew;

