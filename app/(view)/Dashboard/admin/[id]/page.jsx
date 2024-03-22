import React from "react";
import styles from "./style.module.css"

const page = ({parm}) => {


  return (
    <div className="container">
      <div className={`card ${styles.one}`}>
        <h4>Name: Jean-Kerby Auguste</h4>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae
          quod ea sapiente distinctio molestias magni molestiae? Velit ipsam,
          eveniet, atque cumque necessitatibus adipisci quaerat quibusdam
          aliquam commodi est cupiditate ratione, ut alias reprehenderit eaque
          nobis temporibus. Sequi voluptates nobis a!
        </p>
      </div>

      <div style={{ width: "140%" }}>
        <button className="btn btn-primary">Go Back</button>
      </div>

      <div className={`card ${styles.two}`}>
        <h3 style={{ textAlign: "center" }}>Events</h3>

        <div className={styles.test}>
          {/* Repeat this block for each event */}
          <div className={styles.box}>
            <div className={styles.div1}>
              <div className={styles.name}>
                <p>Jacksonville, Fl</p>
              </div>
              <button className={`btn btn-info ${styles.a}`}>More Info</button>
            </div>
          </div>
          {/* Repeat this block for each event */}
        </div>
      </div>
    </div>
  );
};



export default page;
