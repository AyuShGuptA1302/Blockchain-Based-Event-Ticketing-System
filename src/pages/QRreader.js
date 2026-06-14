import react ,{ useState,useRef,useCallback } from "react";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import QRCode from 'react-qr-code';
import Webcam from 'react-webcam';
import jsqr,{ QRReader } from 'jsqr';
import QrScanner from 'react-qr-scanner';
import Mid1 from "../components/Mid1";
import TermsConditionsFrame from "../components/TermsConditionsFrame";

const QRreader = () => {
    const [qrCodeData, setQrCodeData] = useState("");
    const [valid, setvalid] = useState("");
    const videoRef = useRef(null);
  
    const handleScan = (data) => {
      if (data) {
        setQrCodeData(data);
     
      }
      if(qrCodeData.text =="https://example.com"){
        var c="valid ticket";
         setvalid(c);
         
     }
    };
  
    const handleError = (error) => {
      console.error(error);
    };
  /*
   const [qrCodeData, setQrCodeData] = useState(null);
  const videoRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setQrCodeData(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        videoConstraints={{ facingMode: 'environment' }}
        ref={videoRef}
      />
      <p>{qrCodeData && qrCodeData.text}</p>
    </div>
  );
  */ 
    return (
      <div className={styles.tiketScaner}>
      <header className={styles.header}>
        <img
          className={styles.log1Icon}
          loading="lazy"
          alt=""
          src="/log-1@2x.png"
        />
        <nav className={styles.logFrame}>
          <nav className={styles.homeAboutContactFrame}>
            <h2 className={styles.home}>Home</h2>
            <h2 className={styles.about}>About</h2>
            <h2 className={styles.contact}>Contact</h2>
          </nav>
        </nav>
      </header>
      <main className={styles.ticketScannerFrame}>
      <Mid1 />
      <div>
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          videoConstraints={{ facingMode: 'environment' }}
          ref={videoRef}
        />
        <p>{qrCodeData && qrCodeData.text}</p>
          <p>{valid}</p>
      </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.contactRect}>
          <div className={styles.gmBox}>
            <img className={styles.gm1Icon} alt="" src="/gm-1@2x.png" />
          </div>
          <div className={styles.emailText}>
            <div className={styles.infogoticketgmailcom}>
              infogoticket@gmail.com
            </div>
          </div>
          <div className={styles.iBox}>
            <img
              className={styles.ffIcon}
              loading="lazy"
              alt=""
              src="/ff1@3x.png"
            />
            <div className={styles.termsFrame}>
              <img
                className={styles.iIcon}
                loading="lazy"
                alt=""
                src="/i1@3x.png"
              />
            </div>
            <div className={styles.scanLabel}>
              <img
                className={styles.xxIcon}
                loading="lazy"
                alt=""
                src="/xx1@3x.png"
              />
            </div>
          </div>
        </div>
        <div className={styles.termsText}>
          <div className={styles.termsConditions}>{`Terms & Conditions`}</div>
          <div className={styles.footerText}>
            <div className={styles.privacyPolicy}>Privacy Policy</div>
          </div>
        </div>
      </footer>
    </div>
    );

}
export default QRreader;