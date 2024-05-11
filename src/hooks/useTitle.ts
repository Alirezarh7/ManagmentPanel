import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useTitle = (mainTitle: string, subTitle?: string) => {
  const [t] = useTranslation();
  useEffect(() => {
    if (subTitle) {
      document.title = `${t(mainTitle)} - ${t(subTitle)}`;
    } else {
      document.title = `${t(mainTitle)}`;
    }
  }, [mainTitle, subTitle, t]);
};

export default useTitle;
