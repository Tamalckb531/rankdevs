export const isPrevDay = (currTime:number, lastTime:number):boolean => {
    const currDate = new Date(currTime);
    const lastDate = new Date(lastTime);


   // Check if `lastTime` was on the previous calendar day relative to `currentTime`
    return (
        currDate.getDate() !== lastDate.getDate() && // Different day of the month
        (currDate.getDate() - lastDate.getDate() === 1 || // Exactly the day before
         currDate.getTime() - lastDate.getTime() >= 24 * 60 * 60 * 1000) // Handles midnight crossovers
    );
}