//retrives saved DIYs from local storage
const getSavedDIYs = () => {
    const savedDIYs = localStorage.getItem('saved_DIYs')
        ? JSON.parse(localStorage.getItem('saved_DIYs'))
        : [];
    
    return savedDIYs;
    }
//saves DIYs to local storage
    export const savedDIYsIds = (DIYIdArr) => {
        if (DIYIdArr.length) {
            localStorage.setItem('saved_DIYs', JSON.stringify(DIYIdArr));
        } else {
            localStorage.removeItem('saved_DIYs');
        }
    };
//removes DIYs from local storage
    export const removeDIYId = (DIYId) => {
        const savedDIYs = localStorage.getItem('saved_DIYs')
            ? JSON.parse(localStorage.getItem('saved_DIYs'))
            : null;

        if (!savedDIYs) {
            return false;
        }

        const updatedSavedDIYs = savedDIYs?.filter((savedDIYId) => savedDIYId !== DIYId);
        localStorage.setItem('saved_DIYs', JSON.stringify(updatedSavedDIYs));

        return true;
    };