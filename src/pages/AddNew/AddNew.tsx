import { Box, TextField, Button, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_POST, MachineContext } from "../../machine";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './AddNew.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { postAPICall, putAPICall } from "../../apiService";
import { UPLOADFILE } from "../../endPoints";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";
import EmojiModal from "../../components/EmojiModal/EmojiModal";
const AddNew = () => {
    const [currentMachine, sendToMachine] = useContext(MachineContext);
    const userData = JSON.parse(localStorage.getItem('userData') || '{}')

    const [image, setImage] = useState<any>(null);
    const [file, setFiles] = useState<any>(null);
    const [input, setInput] = useState<any>('');
    const [emojiModel, toggleEmojiModel] = useState<boolean>(false);

    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation({
        mutationKey: 'POST_UPLOAD',
        mutationFn: () => {
            const formdata = new FormData();
            formdata.append('file', file)
            return postAPICall({ baseUrl: UPLOADFILE, body: formdata })
        },
        onError: () => {
            toast("Unkown Error while uploading file  ", { type: 'error' });
        },
        onSuccess: (file) => {
            sendToMachine(CREATE_POST, {
                caption: input,
                images: [file.url],
                author: userData.id
            })
        }
    });

    const handleChange = (event: any) => {
        if (event.target.files[0]) {
            setFiles(event.target.files[0]);
            const FR = new FileReader();
            FR.addEventListener("load", function (evt) {
                if (evt && evt.target) {
                    setImage(evt.target.result);
                }
            });
            FR.readAsDataURL(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { text } = event.currentTarget;
        if (!text.value && !file) {
            return
        }
        mutate();
    };

    useEffect(() => {
        if (currentMachine?.value?.posts === 'createPostSuccess') {
            navigate('/');
            sendToMachine('init')
        }
    }, [currentMachine?.value])


    const onTextChange = (evt: any) => {
        if (evt && evt.target) {
            setInput(evt.target.value);
        }
    }

    return (
        <div className="add-new-post">
            {
                emojiModel && <EmojiModal onEmojiClick={(emoji) => setInput(input + emoji)} closeModal={() => toggleEmojiModel(false)} />
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
                        onClick={(evt) => { evt.preventDefault(); toggleEmojiModel(!emojiModel) }}
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

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={currentMachine?.value?.posts === 'createPostInProgress' || isLoading}
                >
                    Add
                </Button>

            </Box >
        </div >
    )
}
export default AddNew;

