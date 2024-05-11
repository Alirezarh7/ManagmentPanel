import React from "react";
import { useTranslation } from "react-i18next";
interface IProsp {
  onclick: () => void;
  customClass?:string
}

const ReturnButton = ({ onclick,customClass}: IProsp) => {
  const [t] = useTranslation();
  return (
    <button onClick={onclick} className={`btn btn-outline-secondary mx-1 ${customClass}`}>
      {t("return")}
      <span className="mdi mdi-18px mdi-chevron-left"></span>
    </button>
  );
};

export default ReturnButton;
