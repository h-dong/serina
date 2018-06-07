import Helper from './Helper';

const serina = (text: string): SerinaSchema => {
  let parsedData: SerinaSchema = {
    original: text,
    text: '',
    isValid: false,
    dateTime: null
  };

  // call a file here that imports other 'rules' and attempting to find a match using the text parsed in here

  parsedData = Helper.parse(text, 'tomorrow');

  // const test = text.match(/tomorrow/);
  // console.log('console:', test);

  // if (text.match(/tomorrow/)) {
  //   const match = 'tomorrow';
  //   parsedData.text = text.replace(match, '');
  //   parsedData.dateTime = dayjs().add(1, 'day').toDate();
  // }

  parsedData.text = Helper.trimWhiteSpaces(parsedData.text);

  return parsedData;
};

export default serina;
