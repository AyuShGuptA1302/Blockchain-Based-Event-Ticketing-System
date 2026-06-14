import { useCallback } from "react";
import HeaderNav5 from "../components/HeaderNav5";
import { useNavigate } from "react-router-dom";

import styles from "./Resell.module.css";
import F00ter from "../components/F00ter";

const Resell = () => {
  const navigate = useNavigate();

  const onHomeText3Click = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <div className={styles.resell}>
      <div className={styles.headerNavParent}>
        <HeaderNav5 />
        <div className={styles.txt}>
          <div className={styles.txtInner}>
            <div className={styles.frameParent}>
              <div className={styles.homeParent}>
                <div className={styles.home} onClick={onHomeText3Click}>
                  Home
                </div>
                <div className={styles.vectorWrapper}>
                  <img
                    className={styles.frameChild}
                    loading="lazy"
                    alt=""
                    src="/vector-17.svg"
                  />
                </div>
                <div className={styles.thriftShop}>Thrift Shop</div>
              </div>
              <div className={styles.thriftShopWrapper}>
                <div className={styles.thriftShop1}>Thrift Shop</div>
              </div>
            </div>
          </div>
          <div className={styles.wereHereToContainer}>
            <p className={styles.wereHereTo}>
              We're here to assist you. Contact us by email, chat, or phone if
              you have any questions.
            </p>
            <p className={styles.p}></p>
          </div>
        </div>
      </div>
      <main className={styles.resellInner}>
        <section className={styles.t1Parent}>
          
          <div className={styles.t5}>
            <div className={styles.names}>
              <div className={styles.evName}>
                <div className={styles.event} >Event :</div>
                <div className={styles.bermellWrapper}>
                  <div className={styles.bermell}>Bermell</div>
                </div>
              </div>
              <div className={styles.vename}>
                <div className={styles.venue}>Venue :</div>
                <div className={styles.kanaVillageWrapper}>
                  <div className={styles.kanaVillage}>Kana Village</div>
                </div>
              </div>
              <div className={styles.date}> 
              <div className={styles.date1} style={{ marginLeft: '0px' }}>Date:</div> 
              <div className={styles.may122024Wrapper}> 
              <div className={styles.may122024} > May 12, 2024 </div>
                </div>
              </div>
            </div>
            <div className={styles.t5Inner} style={{ marginLeft: '0px' }}>
              <div className={styles.sitParent} >
                <div className={styles.sit} >
                  <div className={styles.sit1} >Sit :</div>
                  <div className={styles.div}>251</div>
                </div>
                <div className={styles.priceWrapper}>
                  <div className={styles.price}>
                    <div className={styles.price1}>Price :</div>
                    <div className={styles.wrapper}>
                      <div className={styles.div1}>1500</div>
                    </div>
                  </div>
                </div>
                <div className={styles.typeWrapper}>
                  <div className={styles.type}>
                    <div className={styles.type1}>Type :</div>
                    <div className={styles.vipWrapper}>
                      <div className={styles.vip}>VIP</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.buybtnWrapper}>
              <button className={styles.buybtn} style={{ marginLeft: '500px' }} >
                <div className={styles.buy}>Buy</div>
              </button>
            </div>
            <div className={styles.t5Child} />
            <div className={styles.t5Item} />
          </div>

          
        </section>
      </main>
      <div className={styles.space1} />
      <div className={styles.space2} />
      <F00ter />
    </div>
  );
};

export default Resell;
