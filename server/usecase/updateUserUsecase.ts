import { convertPngRepository } from "$/repository/convertPngRepository";

convertPngRepository
export const updateUserUsecase = {
  fetchinfo: async (selectedFile) => {
    console.log('updateUserUsecase.fetchinfo');
    console.log(selectedFile, 'selectedFile');

    try {
      // S3にアップロード
      const response = await convertPngRepository(selectedFile);
      console.log('File uploaded successfully:', response);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  },
};
