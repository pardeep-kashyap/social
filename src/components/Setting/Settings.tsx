import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
const emails = ['username@gmail.com', 'user02@gmail.com'];
const LOGOUT = 'LOGOUT';
export interface SettingsProps {
    open: boolean;
    onClose: () => void;
}

function Settings(props: SettingsProps) {
    const { onClose, open } = props;
    const navigate = useNavigate()

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value: string) => {
        if (value === LOGOUT)
            localStorage.clear();
        navigate('/signIn')
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Setting</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem disableGutters>
                    <ListItemButton
                        autoFocus
                        onClick={() => handleListItemClick(LOGOUT)}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <LogoutIcon />
                            </Avatar>
                        </ListItemAvatar>

                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}



export default Settings;