import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import pdfIcon from "../../../assets/img/icons8-pdf-48.png";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const AttachmentSubmission = ({onFilesChange}) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const MAX_FILE_SIZE = 1048576; // 1 MB

  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    let errorMessage = null;

    const readFileAsBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });

    const processFiles = async () => {
      const validFiles = [];
      for (const file of selectedFiles) {
        const isPDF = file.type === "application/pdf";
        if (!isPDF) {
          errorMessage = `${file.name} is not a valid PDF file.`;
          break;
        } else if (file.size > MAX_FILE_SIZE) {
          errorMessage = `${file.name} exceeds the maximum size of 1 MB.`;
          break;
        } else {
          try {
            const base64 = await readFileAsBase64(file);
            validFiles.push({
              name: file.name,
              size: file.size,
              base64,
            });
          } catch (err) {
            errorMessage = `Failed to process ${file.name}.`;
            break;
          }
        }
      }

      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError(null);
        const updatedFiles = [...files, ...validFiles];
        setFiles(updatedFiles);
        if (onFilesChange) onFilesChange(updatedFiles);
      }
    };

    processFiles();
  };


  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (onFilesChange) onFilesChange(updatedFiles);
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          border: "2px dashed #c4c4c4",
          borderRadius: "8px",
          padding: "2rem",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <FileUploadOutlinedIcon
          sx={{ fontSize: 35, color: "#c4c4c4", marginBottom: 2 }}
        />
        <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
          
          <label
            htmlFor="multi-file-input"
            style={{ color: "#1976d2", cursor: "pointer" }}
          >
            Pilih berkas
          </label>
        </Typography>
        <Typography variant="body2" color="#2E263DB2">
          Hanya dapat mengupload berkas PDF dengan batasan kurang dari 1 MB.
        </Typography>

        <input
          id="multi-file-input"
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        {error && (
          <Alert
            severity="error"
            onClose={() => setError(null)}
            sx={{ marginTop: 2 }}
          >
            {error}
          </Alert>
        )}
      </Box>
      <Box>
        {files.length > 0 && (
          <List sx={{ marginTop: 2 }}>
            {files.map((file, index) => (
              <ListItem
                key={index}
                sx={{ display: "flex", alignItems: "center", columnGap: 1 }}
              >
                <img alt="pdf" src={pdfIcon} width={40} />
                <ListItemText>
                  <Typography variant="body2"  fontWeight="medium">
                  {file.name}
                  </Typography>
                  <Typography variant="body2" color="#2E263DB2">
                  {`${(file.size / 1024).toFixed(2)} KB`}
                  </Typography>
                </ListItemText>
                <IconButton onClick={() => handleRemoveFile(index)}>
                  <CloseIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default AttachmentSubmission;
