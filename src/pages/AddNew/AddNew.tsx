import { Box, TextField, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_POST, MachineContext } from "../../machine";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './AddNew.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReactGoogleAutocomplete from "react-google-autocomplete";
import EmojiPicker from "emoji-picker-react";
const AddNew = () => {
    const [currentMachine, sendToMachine] = useContext(MachineContext);
    const [image, setImage] = useState<any>(null);
    const [input, setInput] = useState<any>('');
    const [emojiModel, toggleEmojiModel] = useState<boolean>(false);
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



    const onTextChange = (evt: any) => {
        if (evt && evt.target) {
            setInput(evt.target.value);
        }
    }

    const toggleEmoji = (evt: any) => {
        evt.preventDefault();
        toggleEmojiModel(!emojiModel)
    }
    const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
        let sym = emojiData.unified.split("-");
        let codesArray: any[] = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };

    return (
        <div className="add-new-post">
            {
                emojiModel && <div className="emoji-container">
                    <EmojiPicker onEmojiClick={onEmojiClick} autoFocusSearch={false} />
                </div>
            }

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
                        variant="standard"
                        aria-required
                        value={input}
                        onChange={onTextChange}
                    />
                    <button className="emoji-button"
                        onClick={toggleEmoji}
                    >
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
                        </div>
                    )}
                </div>
                {/* <div className="location_container">
                    <LocationOnIcon /> <ReactGoogleAutocomplete
                        style={{ width: "90%" }}
                        className="location_input"
                        onPlaceSelected={(place: any) => {
                            console.log(place);
                        }}
                        options={{
                            types: ["(regions)"],
                            componentRestrictions: { country: "ru" },
                        }}
                        defaultValue="Amsterdam"
                        apiKey={''}
                    />

                </div> */}



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

