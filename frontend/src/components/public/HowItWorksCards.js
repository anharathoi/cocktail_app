import React from 'react'
import './HowItWorks.css'
import Cocktails from '../protected/Cocktails';
import batch from '../../images/batch.svg';
import pour from '../../images/pour.svg';
import ship from '../../images/ship.svg';
import shaker from '../../images/shaker.svg';
import share from '../../images/share.svg';
import '../../images/wine.svg';

export default function HowItWorksCards() {
  return (
      <>

<div class="container">
    <div class="card">
          <div class="cardimage">
            <img id="batch" src={`${batch}`}/>
          </div>
        <div class="card-details">
            <h4><b>BATCH</b></h4> 
            <p>We combine high quality ingredients to create ready to mix classic and original cocktails</p> 
        </div>
    </div>

        <div class="card">
          <div class="cardimage">
            <img id="deliver" src={`${ship}`}/>
          </div>
        <div class="card-details">
            <h4><b>DELIVER</b></h4> 
            <p>We deliver to your door as often as suits you</p> 
        </div>
    </div>

        <div class="card">
          <div class="cardimage">
            <img id="pour" src={`${pour}`}/>
          </div>
        <div class="card-details">
            <h4><b>POUR</b></h4> 
            <p>Easy to follow recipe cards allow you to prepare bar quality cocktails in your own home in minutes</p> 
        </div>
    </div>

        <div class="card">
          <div class="cardimage">
            <img id="mix" src={`${shaker}`}/>
          </div>
        <div class="card-details">
            <h4><b>MIX</b></h4> 
            <p>Add ice</p>
            <p>shake or stir</p> 
        </div>
    </div>

        <div class="card">
          <div class="cardimage">
            <img id="serve" src={`${share}`}/>
          </div>
        <div class="card-details">
            <h4><b>SERVE</b></h4> 
            <p>& ENJOY</p>
        </div>
    </div>
</div>
</>
//     <div>
//     <div id="howitworks" className="howitworks">
//     <div class="card">
//     <div class="cart__content">
//     <div class="card__title"><h1>1. BATCH</h1>
//     </div>
//     <div class="card__text"><p>We combine high quality ingredients to create ready to mix classic and original cocktails
// </p></div>
//     </div>
//     </div>
//     <div class="card">
//     <div class="cart__content">
//     <div class="card__title"><h1>2. DELIVER</h1>
//     </div>
//     <div class="card__text"><p>We deliver to your door as often as suits you</p></div>
//     </div>
//         </div>
//     <div class="card">
//     <div class="cart__content">
//     <div class="card__title"><h1>3. POUR</h1>
//     </div>
//     <div class="card__text"><p>Easy to follow recipe cards allow you to prepare bar quality cocktails in your own home in minutes
// </p></div>
//     </div>
//     </div>
//     <div class="card">
//     <div class="cart__content">
//     <div class="card__title"><h1>4. MIX</h1>
//     </div>
//     <div class="card__text"><p>Add ice ... shake or stir</p>
//     </div>
//         </div>
//     </div>
//     <div class="card">
//     <div class="cart__content">
//     <div class="card__title"><h1>5. SERVE&ENJOY</h1>
//     </div>
//     <div class="card__text"><p>Serve and enjoy with friends
// </p></div>
//     </div>
//     </div>
//     </div>
//     <p class="margin-top-10"></p> 
//     </div>
  )
}
