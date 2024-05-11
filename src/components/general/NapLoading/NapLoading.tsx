import React, { FC } from "react";
import SvgLogo from "../SvgLogo/SvgLogo";
import Ziarat from '../../../assets/ziarat.png';
import clsx from "clsx";
import "./NapLodaing.css";

interface IProps {
  loading: boolean;
  defaultDescription?: string;
  title?: string;
  description?: string;
  loaderColor?: string;
  titleSize?: number;
  titleColor?: string;
}

const NapLoading = ({
  loading,
  description,
  title = "",
  defaultDescription = "در حال بارگذاری",
  loaderColor,
  titleSize,
  titleColor,
}: IProps) => {
  return (
    <>
      {loading ? (
        <div className="splash_screen_wrapper">
          <div className={"splash_screen"}>
            <div
              style={{
                fontSize: titleSize && `${titleSize}rem`,
                color: titleColor && titleColor,
              }}
              className={clsx(
                "spalesh_title",
                titleColor ? "" : "splash_title_color",
                titleSize ? "" : "splash_title_size"
              )}
            >
              {title}
            </div>
            <div className="splash_screen_icon_logo">
             <img src={Ziarat} style={{zIndex:100,transform:"scale(0.7)"}} alt={''} />
            </div>
            <div className="splash_screen_loading">
              <div
                style={{ backgroundColor: loaderColor && loaderColor }}
                className={clsx(
                  "splash_screen_loading_progress",
                  loaderColor ? "" : "splash_screen_loading_progress_bgColor"
                )}
              ></div>
            </div>
            <div className="splash_screen_description">
              {description ? description : defaultDescription}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NapLoading;
