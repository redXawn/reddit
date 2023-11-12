import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading as setGlobalLoading, setUnload as setGlobalUnload } from 'redux/reducers/loading';

const useLoading = () => {
  const dispatch = useDispatch();
  const { globalLoading } = useSelector((state) => state.loading);

  const setLoading = useCallback(
    (payload) => {
      if (payload) {
        dispatch(setGlobalLoading());
      } else {
        dispatch(setGlobalUnload());
      }
    },
    [dispatch]
  );

  return {
    setLoading,
    globalLoading,
  };
};

export default useLoading;
