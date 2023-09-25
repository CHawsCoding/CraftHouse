// Retrieves saved DIYs from local storage
export const getSavedDIYs = () => {
    const savedDIYs = localStorage.getItem('saved_DIYs');
    return savedDIYs ? JSON.parse(savedDIYs) : [];
  };
  
  // Saves DIYs to local storage
  export const savedDIYsIds = (DIYIdArr) => {
    if (DIYIdArr.length) {
      localStorage.setItem('saved_DIYs', JSON.stringify(DIYIdArr));
    } else {
      localStorage.removeItem('saved_DIYs');
    }
  };
  
  // Removes DIYs from local storage
  export const removeDIYId = (DIYId) => {
    const savedDIYs = getSavedDIYs(); // Use the getSavedDIYs function
    if (!savedDIYs) {
      return false;
    }
  
    const updatedSavedDIYs = savedDIYs.filter((savedDIYId) => savedDIYId !== DIYId);
    localStorage.setItem('saved_DIYs', JSON.stringify(updatedSavedDIYs));
    return true;
  };
  