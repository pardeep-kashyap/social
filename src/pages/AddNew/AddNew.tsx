import { useMutation, useQuery } from "@apollo/client";
import { Box, TextField, Button, Grid, Icon, IconButton, Menu, MenuItem, Typography, AppBar, Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_POST, MachineContext } from "../../machine";
import './AddNew.css';
const AddNew = () => {
    const [currentMachine, sendToMachine] = useContext(MachineContext);
    const [image, setImage] = useState<any>(null);
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
    console.log("currentMachine", currentMachine.value)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userData = JSON.parse(localStorage.getItem('userData') || '{}')
        const formData = new FormData(event.currentTarget);
        const { text } = event.currentTarget;
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




    return (
        <div>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <div className="image-upload">
                    <label htmlFor="file-input" className="image-upload__label">
                        {image ? 'Change Image' : 'Upload Image'}
                    </label>
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
                            <img src="https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?resize=624%2C421&ssl=1" alt="placeholder" />
                        </div>
                    )}
                </div>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="text"
                    name="text"
                    autoComplete="text"
                    placeholder="Add New Quote"
                    autoFocus
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add
                </Button>

            </Box>
        </div >
    )
}
export default AddNew;
