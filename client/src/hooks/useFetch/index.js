import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { alertState, userSelector } from "../../recoil";

export function useFetch() {
  const [loading, setLoading] = useState(false);
  const setUser = useSetRecoilState(userSelector);
  const setAlert = useSetRecoilState(alertState);

  async function request({
    fn,
    showSuccessAlert,
    shouldUserUpdate,
    successMessage,
    warningMessage,
    errorMessage,
    resetLoader,
  }) {
    setLoading(true);
    try {
      const response = await fn();
      if (showSuccessAlert) {
        setAlert({
          severity: "success",
          message: successMessage ? successMessage : "Дані успішно оновлені",
        });
      }
      if (shouldUserUpdate) {
        setUser(response);
      }
      return response;
    } catch (error) {
      if (error.response.status === 404) {
        setAlert({
          severity: "warning",
          message: warningMessage
            ? warningMessage
            : "На Жаль, ми не змогли знайти потрібну вам інформацію, перевірте правильність введених данних та спробуйте ще раз",
        });
      }

      if (error.response.status === 500) {
        setAlert({
          severity: "error",
          message: errorMessage
            ? errorMessage
            : "От халепа, щось пішло не так, спробуйте будь ласка пізніше",
        });
      }

      if (error.response.data.message) {
        setAlert({
          severity: "error",
          message: error.response.data.message,
        });
      }
    } finally {
      setLoading(false);
      resetLoader && resetLoader();
    }
  }

  return {
    loading,
    request,
  };
}
