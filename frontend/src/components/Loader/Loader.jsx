import React from "react";
import { TailSpin } from "react-loader-spinner";
import styles from './Loader.module.scss'

const Loader = ({text}) => {
  return (
    <>
    <div className={styles.loaderWrapper}>
    <h2>Loading {text}</h2>
      <TailSpin
        height="80"
        width="80"
        color="#3861fb"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
    </>
  );
};

export default Loader;
