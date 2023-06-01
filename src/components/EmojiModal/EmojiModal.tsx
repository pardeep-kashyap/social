import React, { useEffect, useRef } from "react";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";
import { IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import './EmojiModal.scss';
interface IEmoji {
    closeModal: () => void;
    onEmojiClick: (text: string) => void
}
const EmojiModal: React.FC<IEmoji> = ({ onEmojiClick, closeModal }) => {
    const wrapperRef = useRef(null);
    const isClickOutSide = useOutsideAlerter(wrapperRef);

    useEffect(() => {
        if (isClickOutSide) {
            closeModal();
        }
    }, [isClickOutSide]);

    const emojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
        let sym = emojiData.unified.split("-");
        let codesArray: any[] = [];
        sym.forEach((el: any) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        onEmojiClick(emoji);
    };

    return <div className="emoji-container" ref={wrapperRef}>
        <IconButton size="large" color="inherit" onClick={() => closeModal()}>
            <CancelIcon />
        </IconButton>
        <EmojiPicker onEmojiClick={emojiClick} autoFocusSearch={false} />
    </div>
}

export default EmojiModal;