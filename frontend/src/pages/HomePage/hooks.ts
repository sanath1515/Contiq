import { useState } from 'react';
import axios from '../../services/API';
import { IPresentationProps } from '@src/utils/constants';

export const useFiles = (userId: number) => {
  const [files, setFiles] = useState<Array<IPresentationProps>>([]);
  const resFiles = new Array();
  const updateFiles = () => {
    axios
      .get('/files', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then((res) => {
        const filePromises = res.data.map((file: any) =>
          axios
            .get('/files/thumbnail', {
              params: { file_id: file.id },
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
              responseType: 'blob'
            })
            .then((thumbnailRes) => {
              const binaryData = thumbnailRes.data;
              const blob = new Blob([binaryData], { type: 'image/png' });
              const imageUrl = URL.createObjectURL(blob);
              return { ...file, thumbnail_url: imageUrl };
            })
        );

        Promise.all(filePromises)
          .then((updatedFiles) => {
            setFiles(mapResponseToFiles(updatedFiles));
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return { files: files, updateFiles: updateFiles };
};

interface FileResponseData {
  id: number;
  name: string;
  type: string;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
  thumbnail_url: string;
}

export const mapResponseToFiles = (responses: Array<FileResponseData>) => {
  const output = new Array<IPresentationProps>();
  responses.forEach((response) => {
    output.push({
      id: response.id,
      documentTitle: response.name,
      imgSrc: response.thumbnail_url,
      iconAlt: 'pdf',
      iconSrc: 'assets/icons/pdf.svg',
      imgAlt: response.name,
      createdAt: new Date(response.created_at)
    });
  });
  return output;
};
