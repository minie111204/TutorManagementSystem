import EmailIcon from "../../assets/icons/mail.svg";
import PhoneIcon from "../../assets/icons/Phone.svg";
import PenTool from "../../assets/icons/Pen tool-Footer.svg";
import "./Footer.css";

function Footer(){
    return(
        <>
            <div className="container-footer">
                <div className="left-footer">
                    <h3>Hệ thống Gia sư Dạy kèm tại nhà / TMS</h3>
                    <h3>
                        <img src={EmailIcon} alt="EmailIcon"/>
                        <p>Email : tutor.manager@gmail.com</p>
                    </h3>
                    <h3>
                        <img src={PhoneIcon} alt="PhoneIcon"/>
                        <p>Call us : 091 234 5678</p>
                    </h3>
                </div>
                <div className="right-footer">
                    <img src={PenTool} alt="PenTool"/>
                    <p>Hệ thống Gia sư Dạy kèm tại nhà</p>
                </div>
            </div>
        </>
    );
}

export default Footer;