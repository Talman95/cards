import React, { FC, useState } from 'react';

import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import { AddCardType, UpdateCardType } from '../../../api';
import { BottomNavigationButtons } from '../../../components/BottomNavigationButtons/BottomNavigationButtons';
import { PictureBlock } from '../../../components/PictureBlock/PictureBlock';
import { TextBlock } from '../../../components/TextBlock/TextBlock';
import { modalType } from '../../../enums/modalType';
import { useAppSelector } from '../../../hooks/hooks';
import { useActions } from '../../../hooks/useActions';

type QuestionFormat = 'Text' | 'Picture';

export const CardModal: FC = () => {
  const { setModalClose, addCard, updateCard } = useActions();

  const type = useAppSelector(state => state.modal.type);
  const addCardData = useAppSelector(state => state.modal.data) as AddCardType;
  const updateCardData = useAppSelector(state => state.modal.data) as UpdateCardType;

  const [format, setFormat] = useState<QuestionFormat>('Text');
  const [question, setQuestion] = useState(updateCardData.question || '');
  const [answer, setAnswer] = useState(updateCardData.answer || '');
  const [questionImg, setQuestionImg] = useState<string | null>(
    updateCardData.questionImg || null,
  );
  const [answerImg, setAnswerImg] = useState<string | null>(
    updateCardData.answerImg || null,
  );

  const onFormatChange = (event: SelectChangeEvent): void => {
    setFormat(event.target.value as QuestionFormat);
  };
  const onCloseModalClick = (): void => {
    setModalClose();
  };
  const onSaveDataClick = (): void => {
    if (type === modalType.ADD_CARD) {
      addCard({
        cardsPack_id: addCardData.cardsPack_id,
        question,
        answer,
        questionImg,
        answerImg,
      });
    }

    if (type === modalType.UPDATE_CARD) {
      updateCard({
        _id: updateCardData._id,
        question,
        answer,
        questionImg,
        answerImg,
      });
    }

    setModalClose();
  };

  return (
    <>
      <Typography color="text.secondary" variant="body2">
        Choose a question format:
      </Typography>
      <FormControl fullWidth>
        <Select
          input={<OutlinedInput />}
          value={format}
          onChange={onFormatChange}
          size="small"
        >
          <MenuItem value="Text">Text</MenuItem>
          <MenuItem value="Picture">Picture</MenuItem>
        </Select>
      </FormControl>
      {format === 'Text' ? (
        <TextBlock
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          setAnswer={setAnswer}
        />
      ) : (
        <PictureBlock
          question={questionImg}
          setQuestion={setQuestionImg}
          answer={answerImg}
          setAnswer={setAnswerImg}
        />
      )}
      <BottomNavigationButtons
        navigateBack={onCloseModalClick}
        clickSave={onSaveDataClick}
      />
    </>
  );
};
