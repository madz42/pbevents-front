import axios from "axios";
import { apiUrl } from "../../config/constants";
import { viewField, loadFields, loadIntro } from "./slice";
import { showMessageWithTimeout } from "../appState/thunks";

export const loadIntroThunk = () => {
  return async (dispatch, getState) => {
    try {
      const incoming = await axios.get(`${apiUrl}/field/intro`);
      dispatch(loadIntro(incoming.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
        dispatch(
          showMessageWithTimeout("danger", false, error.response.message, 5000)
        );
      } else {
        console.log(error);
        dispatch(showMessageWithTimeout("danger", false, error.message, 5000));
      }
    }
  };
};

export const loadFieldsThunk = () => {
  return async (dispatch, getState) => {
    try {
      const incoming = await axios.get(`${apiUrl}/field/all`);
      // console.log(incoming.data);
      dispatch(loadFields(incoming.data));
      dispatch(
        showMessageWithTimeout("success", false, "Fields loaded!", 3000)
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
        dispatch(
          showMessageWithTimeout("danger", false, error.response.message, 5000)
        );
      } else {
        console.log(error);
        dispatch(showMessageWithTimeout("danger", false, error.message, 5000));
      }
    }
  };
};

export const viewFieldThunk = (id) => {
  return async (dispatch, getState) => {
    try {
      const incoming = await axios.get(`${apiUrl}/field/id/${id}`);
      // console.log(incoming.data);
      dispatch(
        viewField({ data: incoming.data.data, name: incoming.data.name })
      );
      dispatch(
        showMessageWithTimeout("success", false, "Fields loaded!", 3000)
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
        dispatch(
          showMessageWithTimeout("danger", false, error.response.message, 5000)
        );
      } else {
        console.log(error);
        dispatch(showMessageWithTimeout("danger", false, error.message, 5000));
      }
    }
  };
};
