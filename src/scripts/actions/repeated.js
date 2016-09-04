import shared from '../api/shared';

export function repeatedWords(cb){
  return dispatch => {

    shared.get('repeatedwords/getCountedWords', words => {
      cb (words);
    });

  };
}
