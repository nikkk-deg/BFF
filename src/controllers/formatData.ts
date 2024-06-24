export const formatDocToAddInDB = (file: any) => {
  for (let i = 0; i < file.length; i++) {
    file[i]._id = file[i]._id.$oid;
    file[i].directorId = file[i].directorId.$oid;
    for (let j = 0; j < file[i].genres.length; j++) {
      file[i].genres[j] = file[i].genres[j].$oid;
    }
  }

  return file;
};
