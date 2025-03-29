export const isPrevDay = (currTime:number, lastTime:number):boolean => {
    const currDate = new Date(currTime);
    const lastDate = new Date(lastTime);


   // Compare the year, month, and day of `lastDate` and `currDate`
   return (
    currDate.getFullYear() !== lastDate.getFullYear() || // Handles year change
    currDate.getMonth() !== lastDate.getMonth() ||       // Handles month change
    currDate.getDate() !== lastDate.getDate()            // Handles day change (same month, different day)
);
}