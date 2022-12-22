import React, { ChangeEvent, FC } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Stack } from '@mui/material';

import noImage from '../../assets/no-image.jpg';
import { convertFileToBase64 } from '../../utils/convertFile';

const MAX_FILE_SIZE = 4000000;

type PropsType = {
  question: string | null;
  setQuestion: (question: string | null) => void;
  answer: string | null;
  setAnswer: (answer: string | null) => void;
};

export const PictureBlock: FC<PropsType> = ({
  question,
  setQuestion,
  answer,
  setAnswer,
}) => {
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>, item: string): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < MAX_FILE_SIZE) {
        convertFileToBase64(file, (file64: string) => {
          if (item === 'question') {
            setQuestion(file64);
          } else if (item === 'answer') {
            setAnswer(file64);
          }
        });
      }
    }
  };

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ marginTop: '8px' }}
      >
        <img
          src={question || noImage}
          alt="question cover"
          style={
            question
              ? { maxWidth: 150, maxHeight: 150, marginLeft: '24px' }
              : { maxWidth: 150, maxHeight: 150 }
          }
        />
        {question && (
          <IconButton onClick={() => setQuestion('')}>
            <CloseIcon />
          </IconButton>
        )}
      </Stack>
      <Button component="label" variant="contained" fullWidth size="small">
        <input
          hidden
          accept={'image/*'}
          type="file"
          onChange={e => uploadHandler(e, 'question')}
        />
        Change question
      </Button>

      <Stack direction="row" justifyContent="center" alignItems="flex-start">
        <img
          src={answer || noImage}
          alt="answer cover"
          style={
            answer
              ? { maxWidth: 150, maxHeight: 150, marginLeft: '24px' }
              : { maxWidth: 150, maxHeight: 150 }
          }
        />
        {answer && (
          <IconButton onClick={() => setAnswer('')}>
            <CloseIcon />
          </IconButton>
        )}
      </Stack>
      <Button component="label" variant="contained" fullWidth size="small">
        <input
          hidden
          accept={'image/*'}
          type="file"
          onChange={e => uploadHandler(e, 'answer')}
        />
        Change answer
      </Button>
    </Stack>
  );
};
