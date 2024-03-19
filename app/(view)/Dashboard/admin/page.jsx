import React from "react";
import styles from "./style.module.css";

const page = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={`card ${styles.one}`}>
          {/* <h2 style="text-align: center; margin-bottom: 40px;">Jacksonville, FL</h2> */}
          <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
            Jacksonville, FL
          </h2>

          {/* <div className="indicator"> */}
          <div className={styles.indicator}>
            <div>
              <h3>Max: 20</h3>
            </div>
            <div>
              <h3>Current: 11</h3>
            </div>
            <div>
              <h3>Available: 9</h3>
            </div>
          </div>
        </div>

        <div className={`card ${styles.two}`}>
          {/* <h1 style="text-align: center;">Wait List </h1> */}
          <h1 style={{ textAlign: "center" }}>Wait List </h1>

          <div className={styles.test}>
            <div className={styles.box}>
              <div className={styles.div1}>
                <div className={styles.name}>
                  <p>Jean-Kerby Auguste</p>
                </div>
                <button className={`btn btn-info ${styles.a}`}>
                  More Info
                </button>
              </div>
              <div className={styles.div2}>
                <div>
                  <button className={`btn btn-success ${styles.b}`}>Add</button>
                </div>
                <hr className={styles.line}></hr>
                <div>
                  <button className={`btn btn-danger ${styles.c}`}>
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.box}>
              <div className={styles.div1}>
                <div className={styles.name}>
                  <p>Jean-Kerby Auguste</p>
                </div>
                <button className={`btn btn-info ${styles.a}`}>
                  More Info
                </button>
              </div>
              <div className={styles.div2}>
                <div>
                  <button className={`btn btn-success ${styles.b}`}>Add</button>
                </div>
                <hr className={styles.line}></hr>
                <div>
                  <button className={`btn btn-danger ${styles.c}`}>
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.box}>
              <div className={styles.div1}>
                <div className={styles.name}>
                  <p>Jean-Kerby Auguste</p>
                </div>
                <button className={`btn btn-info ${styles.a}`}>
                  More Info
                </button>
              </div>
              <div className={styles.div2}>
                <div>
                  <button className={`btn btn-success ${styles.b}`}>Add</button>
                </div>
                <hr className={styles.line}></hr>
                <div>
                  <button className={`btn btn-danger ${styles.c}`}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`card ${styles.three}`}>
          {/* <h1 style="text-align: center;">Acceptance List</h1> */}
          <h1 style={{ textAlign: "center" }}>Acceptance List</h1>
          <div className={styles.test}>
            <div className={styles.box}>
              <div className={styles.div1}>
                <div className={styles.name}>
                  <p>Jean-Kerby Auguste</p>
                </div>
                <button className={`btn btn-info ${styles.a}`}>
                  More Info
                </button>
              </div>
              <div className={styles.div2}>
                <div>
                  <button className={`btn btn-success ${styles.b}`}>
                    Accept
                  </button>
                </div>
                <hr className={styles.line}></hr>
                <div>
                  <button className={`btn btn-danger ${styles.c}`}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
