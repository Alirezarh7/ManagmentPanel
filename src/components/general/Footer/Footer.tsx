import {Link} from "react-router-dom";
import React from "react";

const Footer = () => {
    return (
     <>
         <div className={"footer-p"}>
             <div className={'footer'}>
                 <div>
                     <p>آدرس: تهران ، خيابان آزادي ، نبش خيابان رودکي شمالي ، سازمان حج و زيارت</p>
                     <p>ساعت کاری سازمان: شنبه الی چهارشنبه ساعت 8 الی 16</p>
                     <p> تلفن : 64511 -021</p>
                 </div>
                 <div>
                     <p> پست الکترونیک : info@haj.ir</p>
                     <p> فکس : 66582130 - 021</p>
                     <div className={'footer-links'}>
                         <Link to={"#"}>سوالات متداول</Link>
                         <Link to={"#"}>درباره ما</Link>
                         <Link to={"#"}>رسیدگی به شکایات</Link>
                         <Link to={"#"}>شرکت در نظرسنجی</Link>
                         <Link to={"#"}>دفاتر استانی</Link>
                     </div>
                 </div>
             </div>
             <p className={"footer-des"}>
                 تمامی حقوق مادی و معنوی این سایت مطعلق به سازمان حج و زیارت میباشد
             </p>
         </div>
     </>
    )
}
export default Footer
