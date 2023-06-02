export const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const timeSinceText = (date: Date) => {
    var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + 'Y';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + 'M';
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + 'D';
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + 'h';
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + 'MI';
    }
    return Math.floor(seconds) + 'S';
};