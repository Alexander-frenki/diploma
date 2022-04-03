import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { loaderState } from "../../recoil/loader";

export function useLoader() {
  const [loaderActions, setLoaderActions] = useRecoilState(loaderState);

  function removeAction(action) {
    setLoaderActions([...loaderActions].filter((act) => action !== act));
  }

  function addAction(action) {
    setLoaderActions([...loaderActions, action]);
  }

  return { removeAction, addAction };
}

useLoader.propTypes = {
  action: PropTypes.string,
};
