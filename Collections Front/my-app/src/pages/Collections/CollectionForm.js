import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CollectionContext from '../../store/collection';
import {
  Box,
  Grid,
  FormControl,
  Button,
  TextField,
  Typography,
  Snackbar,
} from '@mui/material';
import useMutation from '../../Hooks/useMutation';
import {
  initialFieldValues,
  showOptionalFields,
  TextFieldName,
  TextFieldTopic,
  TextFieldDescription,
} from './helpers/CollectionFormsHelpers';

import * as cls from './styles/CollectionFormSX';

const CollectionForm = () => {
  const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  const { collectionId } = useParams();
  const collectionCtx = useContext(CollectionContext);
  const [values, setValues] = useState(initialFieldValues);
  const [optionalFields, setOptionalCheckboxes] = useState(showOptionalFields);
  const [descriptionPreview, setDescriptionPreview] = useState(false);
  const [customizationPreview, setCustomizationPreview] = useState(false);
  const [singInMessage, setSignInMessage] = useState(null);
  const [uploadFile, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const signInMessageHandler = (message) => {
    setOpen(true);
    setSignInMessage(message);
  };
  const fileSelectedHandler = (e) => {
    setFile(e.target.files[0]);
  };
  const hadleDescriptionPreview = () => {
    setDescriptionPreview((prevState) => !prevState);
  };
  const handleCustomizationPreview = () => {
    setCustomizationPreview((prevState) => !prevState);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleOptional = (e) => {
    let { name } = e.target;
    setOptionalCheckboxes({
      ...optionalFields,
      [name]: !optionalFields[name],
    });
  };

  let url = process.env.REACT_APP_URL;
  if (collectionCtx.mode === 'new') {
    url = `${url}/collection/create`;
  } else {
    url = `${url}/collection/edit/${collectionId}`;
  }

  const { mutate: uploadCollection } = useMutation(url);

  const submitCollectionHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const fd = new FormData();
    if (uploadFile) {
      if (!validFileTypes.find((type) => type === uploadFile.type)) {
        signInMessageHandler('File must be in JPG/PNG format');
        setOpen(true);
      }
      fd.append('image', uploadFile);
    }
    for (const property in values) {
      fd.append(property, values[property]);
    }
    try {
      await uploadCollection(fd, token);
      signInMessageHandler('Collection successfully created');
      setOpen(true);
      setValues(initialFieldValues);
      setOptionalCheckboxes(showOptionalFields);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        type="button"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Grid item md={8} sx={{ marginY: '40px' }}>
      <form onSubmit={submitCollectionHandler} encType="multipart/form">
        <FormControl sx={cls.formControl}>
          <Box sx={cls.formControlBox}>
            <Box sx={cls.defaultInputBox}>
              <Box sx={cls.nameTopicBox}>
                <TextFieldName
                  class={cls.formInputs}
                  value={values.name}
                  handleChange={handleInputChange}
                />
                <TextFieldTopic
                  class={cls.formTopic}
                  value={values.topic}
                  handleChange={handleInputChange}
                />
              </Box>
              <TextFieldDescription
                class={cls.formDescription}
                value={values.description}
                handleChange={handleInputChange}
              />

              <Box sx={cls.iconBox}>
                {descriptionPreview ? (
                  <VisibilityOffIcon
                    sx={cls.iconStyle}
                    onClick={hadleDescriptionPreview}
                  />
                ) : (
                  <VisibilityIcon
                    sx={cls.iconStyle}
                    onClick={hadleDescriptionPreview}
                  />
                )}

                <Typography
                  sx={{
                    color: 'primary.main',
                  }}
                >
                  Description preview
                </Typography>
                {customizationPreview ? (
                  <VisibilityOffIcon
                    sx={cls.iconStyle}
                    onClick={handleCustomizationPreview}
                  />
                ) : (
                  <VisibilityIcon
                    sx={cls.iconStyle}
                    onClick={handleCustomizationPreview}
                  />
                )}
                <Typography
                  sx={{
                    color: 'primary.main',
                  }}
                >
                  Customize
                </Typography>
              </Box>

              <Box sx={cls.buttonBox}>
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: 'none' }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={fileSelectedHandler}
                  />
                  <Button sx={cls.buttonStyle} component="span">
                    Upload image
                  </Button>
                </label>
                <Button sx={cls.buttonStyle} type="submit">
                  {collectionCtx.mode === 'new'
                    ? 'Add Collection'
                    : 'Edit Collection'}
                </Button>
              </Box>
            </Box>
            <Box sx={cls.descriptionPreviewContainerBox}>
              {descriptionPreview && (
                <Box sx={cls.descriptionPreviewBox}>
                  <ReactMarkdown children={values.description} />
                </Box>
              )}
            </Box>
          </Box>
          {customizationPreview && (
            <Grid container spacing={4}>
              <Grid item md={4}>
                <Box sx={cls.categoryOptionalInputBox}>
                  <Typography sx={cls.categoryOptionalHeader}>
                    Integer fields
                  </Typography>
                  <Box sx={cls.singleOptionalInputsBox}>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="integer1"
                        onClick={handleOptional}
                      >
                        {optionalFields.integer1 ? '-' : '+'}
                      </Button>
                      {optionalFields.integer1 && (
                        <TextField
                          onChange={handleInputChange}
                          name="integer1name"
                          value={values.integer1name}
                          sx={cls.singleOptionalInput}
                          label="Name"
                          size="small"
                        />
                      )}
                    </Box>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="integer2"
                        onClick={handleOptional}
                      >
                        {optionalFields.integer2 ? '-' : '+'}
                      </Button>
                      {optionalFields.integer2 && (
                        <TextField
                          sx={cls.singleOptionalInput}
                          value={values.integer2name}
                          size="small"
                          name="integer2name"
                          label="Name"
                          onChange={handleInputChange}
                        />
                      )}
                    </Box>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="integer3"
                        onClick={handleOptional}
                      >
                        {optionalFields.integer3 ? '-' : '+'}
                      </Button>
                      {optionalFields.integer3 && (
                        <TextField
                          sx={cls.singleOptionalInput}
                          value={values.integer3name}
                          size="small"
                          name="integer3name"
                          label="Name"
                          onChange={handleInputChange}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box sx={cls.categoryOptionalInputBox}>
                  <Typography sx={cls.categoryOptionalHeader}>
                    String fields
                  </Typography>
                  <Box sx={cls.singleOptionalInputsBox}>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="string1"
                        onClick={handleOptional}
                      >
                        {optionalFields.string1 ? '-' : '+'}
                      </Button>
                      {optionalFields.string1 && (
                        <TextField
                          onChange={handleInputChange}
                          name="string1name"
                          value={values.string1name}
                          sx={cls.singleOptionalInput}
                          label="Name"
                          size="small"
                        />
                      )}
                    </Box>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="string2"
                        onClick={handleOptional}
                      >
                        {optionalFields.string2 ? '-' : '+'}
                      </Button>
                      {optionalFields.string2 && (
                        <TextField
                          sx={cls.singleOptionalInput}
                          value={values.string2name}
                          size="small"
                          name="string2name"
                          label="Name"
                          onChange={handleInputChange}
                        />
                      )}
                    </Box>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="string3"
                        onClick={handleOptional}
                      >
                        {optionalFields.string3 ? '-' : '+'}
                      </Button>
                      {optionalFields.string3 && (
                        <TextField
                          sx={cls.singleOptionalInput}
                          value={values.string3name}
                          size="small"
                          name="string3name"
                          label="Name"
                          onChange={handleInputChange}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box sx={cls.categoryOptionalInputBox}>
                  <Typography sx={cls.categoryOptionalHeader}>
                    Data fields
                  </Typography>
                  <Box sx={cls.singleOptionalInputsBox}>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="data1"
                        onClick={handleOptional}
                      >
                        {optionalFields.data1 ? '-' : '+'}
                      </Button>
                      {optionalFields.data1 && (
                        <TextField
                          onChange={handleInputChange}
                          name="data1name"
                          value={values.data1name}
                          sx={cls.singleOptionalInput}
                          label="Name"
                          size="small"
                        />
                      )}
                    </Box>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="data2"
                        onClick={handleOptional}
                      >
                        {optionalFields.data2 ? '-' : '+'}
                      </Button>
                      {optionalFields.data2 && (
                        <TextField
                          sx={cls.singleOptionalInput}
                          value={values.data2name}
                          size="small"
                          name="data2name"
                          label="Name"
                          onChange={handleInputChange}
                        />
                      )}
                    </Box>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="data3"
                        onClick={handleOptional}
                      >
                        {optionalFields.data3 ? '-' : '+'}
                      </Button>
                      {optionalFields.data3 && (
                        <TextField
                          sx={cls.singleOptionalInput}
                          value={values.data3name}
                          size="small"
                          name="data3name"
                          label="Name"
                          onChange={handleInputChange}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box sx={cls.categoryOptionalInputBox}>
                  <Typography sx={cls.categoryOptionalHeader}>
                    Text fields
                  </Typography>
                  <Box sx={cls.singleOptionalInputsBox}>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="text1"
                        onClick={handleOptional}
                      >
                        {optionalFields.text1 ? '-' : '+'}
                      </Button>
                      {optionalFields.text1 && (
                        <TextField
                          onChange={handleInputChange}
                          name="text1name"
                          value={values.text1name}
                          sx={cls.singleOptionalInput}
                          label="Name"
                          size="small"
                        />
                      )}
                    </Box>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="text2"
                        onClick={handleOptional}
                      >
                        {optionalFields.text2 ? '-' : '+'}
                      </Button>
                      {optionalFields.text2 && (
                        <TextField
                          sx={cls.singleOptionalInput}
                          value={values.text2name}
                          size="small"
                          name="text2name"
                          label="Name"
                          onChange={handleInputChange}
                        />
                      )}
                    </Box>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="text3"
                        onClick={handleOptional}
                      >
                        {optionalFields.text3 ? '-' : '+'}
                      </Button>
                      {optionalFields.text3 && (
                        <TextField
                          sx={cls.singleOptionalInput}
                          value={values.text3name}
                          size="small"
                          name="text3name"
                          label="Name"
                          onChange={handleInputChange}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography sx={cls.categoryOptionalHeader}>
                    Checkboxes
                  </Typography>
                  <Box sx={cls.singleOptionalInputsBox}>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="checkbox1"
                        onClick={handleOptional}
                      >
                        {optionalFields.checkbox1 ? '-' : '+'}
                      </Button>
                      {optionalFields.checkbox1 && (
                        <TextField
                          onChange={handleInputChange}
                          name="checkbox1name"
                          value={values.checkbox1name}
                          sx={cls.singleOptionalInput}
                          label="Name"
                          size="small"
                        />
                      )}
                    </Box>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="checkbox2"
                        onClick={handleOptional}
                      >
                        {optionalFields.checkbox2 ? '-' : '+'}
                      </Button>
                      {optionalFields.checkbox2 && (
                        <TextField
                          sx={cls.singleOptionalInput}
                          value={values.checkbox2name}
                          riant
                          size="small"
                          name="checkbox2name"
                          label="Name"
                          onChange={handleInputChange}
                        />
                      )}
                    </Box>
                    <Box sx={cls.singleOptionalInputBox}>
                      <Button
                        sx={cls.toggleOptionalVisibilityButton}
                        name="checkbox3"
                        onClick={handleOptional}
                      >
                        {optionalFields.checkbox3 ? '-' : '+'}
                      </Button>
                      {optionalFields.checkbox3 && (
                        <TextField
                          sx={cls.formInputs}
                          value={values.checkbox3name}
                          size="small"
                          name="checkbox3name"
                          label="Name"
                          onChange={handleInputChange}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </FormControl>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={singInMessage}
        action={action}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
      />
    </Grid>
  );
};
export default CollectionForm;
