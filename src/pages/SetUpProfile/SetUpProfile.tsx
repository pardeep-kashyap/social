import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRouteContant } from "../../constants";
import { Avatar, Button, TextField } from "@mui/material";
import './SetUpProfile.scss';
import { postAPICall, putAPICall } from "../../apiService";
import { UPDATE_USER, UPLOADFILE } from "../../endPoints";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const SetUpProfile = () => {
    const location = useLocation();
    const navigate = useNavigate()
    console.log(location?.state)
    const [profile, setProfile] = useState(location?.state);
    const [file, setFile] = useState<File>();
    const { mutate, isLoading } = useMutation({
        mutationKey: 'MF_PROFILE',
        mutationFn: (profile) => putAPICall({ baseUrl: UPDATE_USER, body: { ...profile } }),
        onError: (error: any) => {
            toast(error.message, { type: 'error' });
        },
        onSuccess: () => {
            navigate(-1);
        }
    });


    const { mutate: fileUploadMutate, isLoading: fileUploadLoading } = useMutation({
        mutationKey: 'POST_UPLOAD',
        mutationFn: () => {
            const formdata = new FormData();
            formdata.append('file', file ? file : '')
            return postAPICall({ baseUrl: UPLOADFILE, body: formdata })

        },
        onError: (error: any) => {
            toast(error.message, { type: 'error' });
        },
        onSuccess: (file) => {
            mutate({ ...profile, userImage: file.url })
        }
    });

    useEffect(() => {
        if (!location?.state?.id) {
            navigate(AppRouteContant.HOME)
        }
    }, [location?.state]);

    const onCancel = (evt: any) => {
        evt.preventDefault();
        navigate(-1)
    }

    const updateAvatar = (event: any) => {
        if (event.target.files[0]) {
            setFile(event.target.files[0]);

            const FR = new FileReader();
            FR.addEventListener("load", function (evt) {
                if (evt && evt.target) {
                    setProfile({ ...profile, userImage: evt.target.result });
                }
            });

            FR.readAsDataURL(event.target.files[0]);
        }
    };

    return <div className="SetUpProfile">
        <div className="pt-4">
            <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={updateAvatar}
                className="SetUpProfile__input"
            />
            <Avatar sx={{ width: "150px", height: "150px" }} alt={profile.firstName} src={profile?.userImage} />
        </div>
        <div className="pt-0.5">
            <label htmlFor="file-input" className="m-3 block SetUpProfile-change">
                Change
            </label>
        </div>
        <form className="user-form" onSubmit={(evt) => { evt.preventDefault(); file ? fileUploadMutate() : mutate(profile) }}>
            <TextField
                required
                id="outlined-required"
                label="Username"
                value={profile.username}
                onChange={(evt) => setProfile({ ...profile, username: evt.target.value })}
            />
            <TextField
                required
                id="outlined-required"
                label="First Name"
                value={profile.firstName}
                onChange={(evt) => setProfile({ ...profile, firstName: evt.target.value })}
            />
            <TextField
                required
                id="outlined-required"
                label="Last Name"
                value={profile.lastName}
                onChange={(evt) => setProfile({ ...profile, lastName: evt.target.value })}
            />

            <TextField
                id="outlined-required"
                label="Bio"
                multiline
                rows={4}
                value={profile.bio}
                onChange={(evt) => setProfile({ ...profile, bio: evt.target.value })}
            />

            <div className="user-form-action">
                <Button variant="contained" type="submit" disabled={isLoading || fileUploadLoading}>{isLoading || fileUploadLoading ? 'Hang On...' : 'Save'}</Button>
                <Button variant="outlined" onClick={onCancel}>Cancel</Button>
            </div>
        </form>
    </div>

}
export default SetUpProfile; 