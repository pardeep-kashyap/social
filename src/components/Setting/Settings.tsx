import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { AppRouteContant } from '../../constants';
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
        navigate(AppRouteContant.SIGNIN)
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