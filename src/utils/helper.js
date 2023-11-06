export const timeDiff = (create) => {
    const nowDate = new Date();
    const createdDate = new Date(create);

    const miliSec = nowDate - createdDate;
    const second = miliSec/1000;
    const min = second/60;
    let hour;
    
    min/60 > 0.5 ? hour = Math.ceil(min/60) : hour = Math.floor(min/60);

    return hour
}