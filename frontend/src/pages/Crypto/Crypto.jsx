import React,{useState,useEffect} from 'react'
import { getCrypto } from '../../api/external';
import styles from './Crypto.module.scss'

const Crypto = () => {
  let count = 1;
  const [articals, setArticals] = useState([])
  useEffect(() => {
    (async function newsApiCall(){
      const response = await getCrypto();
      setArticals(response)
    })();
      // cleanup function

      setArticals([]);

  },[])
  return (
    <>
       <div className='container'>
          <div className={styles.tableMain}>
       <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Coin</th>
      <th scope="col">Symbol</th>
      <th scope="col">Price</th>
      <th scope="col">24h</th>
    </tr>
  </thead>
  <tbody>
    {articals.map((val,index) => {
      return(
        <tr>
        <th scope="row">{index+1}</th>
        <td> <div className='d-flex'><img src={val.image} width={40} height={40} /> {val.name}</div></td>
        <td>{val.symbol}</td>
        <td>{val.current_price}</td>
        <td>{val.price_change_24h}</td>
      </tr>
      )
    })}
    
  </tbody>
</table>

          </div>
       </div>
    </>
  )
}

export default Crypto