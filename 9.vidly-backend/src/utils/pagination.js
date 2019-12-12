export const pagination = (items, pageNo, pageSize) => {

    const startIndex = ((pageNo - 1) * pageSize)  ;
    const endIndex = startIndex + pageSize;
    const itemList = items.slice(startIndex, endIndex);
    return itemList;
};