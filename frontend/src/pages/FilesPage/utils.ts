import { FilesDataType } from '@src/utils/constants';
import axios from '@src/services/API';

export interface FileResponse {
  id: string;
  mimeType: string;
  modifiedTime: string;
  name: string;
}

export const mapFilesData = (fileResponseData: Array<FileResponse>) => {
  let filesData = new Array<FilesDataType>();
  fileResponseData.forEach((fileResponse) => {
    filesData.push({
      fileName: fileResponse.name,
      isChecked: false,
      id: fileResponse.id
    });
  });
  return filesData;
};

export const checkFileExistence = async (userId: number, fileName: string) => {
  try {
    const response = await axios.get('/files/findByName', {
      params: {
        user_id: userId,
        file_name: fileName.slice(0, 60)
      },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.status === 200;
  } catch {}
};
