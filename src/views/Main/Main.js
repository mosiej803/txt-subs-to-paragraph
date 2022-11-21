import React, { useEffect, useState } from 'react';
import {
  Title,
  Form,
  Button,
  Result,
  Options,
  Loader,
  ProgressBar,
} from './Main.styles';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import FileInput from 'components/atoms/FileInput/FileInput';
import { useForm } from 'react-hook-form';
import { processFile } from 'helpers/main';
import { CHAR_LIMIT_DEFAULT } from 'helpers/config';
import FormField from 'components/atoms/FileInput/FormField/FormField';
import { useData } from 'hooks/useData';

const Main = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    processedText,
    converted,
    handleSetProcessedText,
    handleSetConverted,
  } = useData();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (processedText) handleSetConverted({ current: null, outOf: null });
  }, [processedText, handleSetConverted]);

  const onFormSubmit = ({ charLimit, isSentences }) => {
    processFile({
      selectedFile,
      handleSetProcessedText,
      charLimit,
      isSentences,
      handleSetConverted,
    });
  };

  const handleSetSelectedFile = (e) => {
    clearErrors();
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <MainTemplate>
      <Title>Txt Subs To Paragraphs</Title>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <FileInput
          register={register}
          selectedFile={selectedFile}
          onChange={handleSetSelectedFile}
          errors={errors}
        />
        <Options>
          <FormField
            defaultValue={CHAR_LIMIT_DEFAULT}
            register={register}
            name="charLimit"
            label="Character limit:"
            type="number"
            max={2000}
            min={100}
          />
          <FormField
            register={register}
            name="isSentences"
            label="Is divided into sentences"
            type="checkbox"
          />
        </Options>
        <Button type="submit">Submit</Button>
      </Form>
      <Result>
        {converted.current > 0 ? (
          <Loader>
            Converted: {converted.current} out of {converted.outOf}
            <ProgressBar converted={converted} />
          </Loader>
        ) : null}
        {processedText?.length > 0
          ? processedText.map((p) => <p key={p.slice(-50)}>{p}</p>)
          : null}
      </Result>
    </MainTemplate>
  );
};

export default Main;
