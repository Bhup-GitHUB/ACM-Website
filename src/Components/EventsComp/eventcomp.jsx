import React, { useState, useEffect, Fragment} from 'react';
import styles from "./eventcomp.module.css";
import { events } from "../../data.mjs";

const EventComp = ( {eventdata} ) => {
    const {details} = events;
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	useEffect(() => {
		details.forEach((item) => {
		  const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % item.img.length);
		  }, 5000); // Change image every 5 seconds
	  
		  return () => clearInterval(interval);
		});
	  }, [details.length]);	  

	return(
		<Fragment>
		<div className={styles.main}>
		{details.slice(0,6).map((items,index)=>{
			return(
				<div className={styles.box1} key={index}>
                <div className={styles.heading}>
                    <h1>{items.heading}</h1>
                </div>
				<div className={styles.content}>
					<div className={styles.innercontent}>
               				<h3 >{items.subtitle}</h3>
							<h6>{items.description}</h6>
                			<p > {items.data}</p>
                	</div>
					<div className={styles.imagebig}>
						<div className={styles.innerimg}>
        						<img key={index} src={items.img}  />
						</div>
    				</div>
        		</div>
            </div>
		)
		})}

		<hr className={styles.line} />

		{/* {details.slice(3,6).map((items,index)=>{
			return(
				<div className={styles.box1} key={index}>
                <div className={styles.heading}>
                    <h1>{items.heading}</h1>
                </div>
				<div className={styles.content}>
					<div className={styles.innercontent}>
               				<h3 >{items.subtitle}</h3>
							<h6>{items.description}</h6>
                			<p > {items.data}</p>
                	</div>
					<div className={styles.imagebig}>
						<div className={styles.innerimg}>
        						<img key={index} src={items.img}  />
						</div>
    				</div>
        		</div>
            </div>
		)
		})} */}


		{/* IDEATHON */}

{details.slice(6,7).map((items,index)=>(
  <div className={styles.box1} key={index}>
    <div className={styles.content}>
      <div className={styles.innercontent}>
        <h3>{items.subtitle}</h3>
        <h6>{items.description}</h6>
        <p>{items.data}</p>
      </div>
      <div className={styles.imagebig}>
        <div className={styles.innerimg}>
          <img key={index} src={items.img} />
        </div>
      </div>
    </div>
  </div>
))}
{/* CodeSprint */}
{/* <hr className={styles.line} /> */}
{details.slice(7,8).map((items,index)=>(
  <div className={styles.box1} key={`codesprint-${index}`}>
    <div className={styles.content}>
      <div className={styles.innercontent}>
        <h3>{items.subtitle}</h3>
        <h6>{items.description}</h6>
        <p>{items.data}</p>
      </div>
      <div className={styles.imagebig}>
        <div className={styles.innerimg}>
          <img src={items.img} alt={items.subtitle}/>
        </div>
      </div>
    </div>
  </div>
))}

{/* Orientation */}
{/* <hr className={styles.line} /> */}
{details.slice(8,9).map((items,index)=>(
  <div className={styles.box1} key={`orientation-${index}`}>
    <div className={styles.content}>
      <div className={styles.innercontent}>
        <h3>{items.subtitle}</h3>
        <h6>{items.description}</h6>
        <p>{items.data}</p>
      </div>
      <div className={styles.imagebig}>
        <div className={styles.innerimg}>
          <img src={items.img} alt={items.subtitle}/>
        </div>
      </div>
    </div>
  </div>
))}


	
		</div>
		</Fragment>
	)
}

export default EventComp;