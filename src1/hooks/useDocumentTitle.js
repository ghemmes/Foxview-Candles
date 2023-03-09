import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'Foxview Candles - Candle Store';
    }
  }, [title]);
};

export default useDocumentTitle;
