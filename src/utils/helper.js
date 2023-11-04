export const timeDiff = (create) => {
    const nowDate = new Date();
    const createdDate = new Date(create);

    const miliSec = nowDate - createdDate;
    const second = miliSec/1000;
    const min = second/60;
    const hour = Math.ceil(min/60);

    return hour
}