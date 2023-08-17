import React,{useState,useEffect} from 'react'
import styles from './Home.module.scss'
import { getNews } from '../../api/external'
import Loader from '../../components/Loader/Loader'


const Home = () => {
  const [articals, setArticals] = useState([])

  useEffect(() => {
    (async function newsApiCall(){
      const response = await getNews();
      setArticals(response)
    })();
      // cleanup function

      setArticals([]);

  },[])

  const handleCardClick = (url) => {
       window.open(url, '_blank')
  }

  if(articals.length === 0){
    return(
      <Loader   text={'Homepage'}/>
    )
  }

  return (
    <>
      <div className="container">
        <h2 className='text-center my-5'>Latest Articles</h2>
        <div className="row" style={{marginBottom: '80px'}}>
            {articals.map((val) => {
                return (
                    <div className="col-md-4 col-12 mt-4" key={val.url} onClick={() => handleCardClick(val.url)}>
              <div className={styles.card}>
                <img src={val.urlToImage} className="card-img-top" alt="..." />
                <div className={styles.card_body}>
                  <h5 className="card-title">{val.title}</h5>
                </div>
              </div>
            </div>
                )
            })}
          </div>
      </div>
    </>
  )
}

export default Home