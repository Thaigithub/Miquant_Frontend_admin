export const removeEmptyParams = (data: any) => {
  const newData = { ...data };
  for (const key in newData) {
    if (
      newData[key] === '' ||
      newData[key] === 'null' ||
      newData[key] === null ||
      newData[key] === undefined ||
      newData[key] === 'ALL'
    ) {
      delete newData[key];
    }
  }
  return newData;
};
