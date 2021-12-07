import React, { useEffect, useState } from 'react';
import './PlanScreen.css';
import { auth, db, payments } from '../firebase';
import { getDocs, query, collection, where } from 'firebase/firestore';
import Plan from '../components/Plan';
import { createCheckoutSession } from '@stripe/firestore-stripe-payments';
import { useDispatch } from 'react-redux';
import { setPlan } from '../state/features/userSlice';

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const dispatch = useDispatch();

  const loadCheckout = async priceId => {
    const session = await createCheckoutSession(payments, {
      price: priceId,
    });
    window.location.assign(session.url);
  };

  useEffect(() => {
    /*async function getCustomClaimRole() {
      await auth.currentUser.getIdToken(true);
      const decodedToken = await auth.currentUser.getIdTokenResult();
      setSubscription({
        role: decodedToken.claims.stripeRole,
        current_period_end: decodedToken.claims.exp (well exp is actually the toke expiration date but at leat we can see how usefull the toke can be) ,
        current_period_start: decodedToken.claims.auth_time,
      });
      console.log(decodedToken  );
      return decodedToken.claims.stripeRole;
    }
    getCustomClaimRole();
    */

    const user = auth.currentUser;
    console.log(user);
    if (user) {
      getDocs(collection(db, 'customers', user.uid, 'subscriptions')).then(
        snap => {
          snap.forEach(async subscription => {
            setSubscription({
              role: subscription.data().role,
              current_period_end:
                subscription.data().current_period_end.seconds,
              current_period_start:
                subscription.data().current_period_start.seconds,
            });

            dispatch(setPlan(subscription.data().role));
          });
        }
      );
    }
  }, [auth]);

  useEffect(() => {
    getDocs(query(collection(db, 'products')), where('active', '==', true))
      .then(querySnapshot => {
        const products = {};
        querySnapshot.forEach(async doc => {
          products[doc.id] = doc.data();
          getDocs(collection(doc.ref, 'prices')).then(priceSnapshot => {
            priceSnapshot.forEach(snapdoc => {
              products[doc.id].prices = {
                priceId: snapdoc.id,
                priceData: snapdoc.data(),
              };
            });
          });
        });
        setProducts(products);
      })
      .catch(error => alert(error.message));
  }, []);

  console.log(subscription);

  return (
    <div className='planScreen'>
      {subscription && (
        <h4>
          Renewal Date:{' '}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </h4>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          .toLowerCase()
          .includes(subscription?.role?.toLowerCase());

        return (
          <Plan
            key={productId}
            name={productData.name}
            description={productData.description}
            loadCheckout={() => loadCheckout(productData.prices.priceId)}
            subscribed={isCurrentPackage}
          />
        );
      })}
    </div>
  );
}

export default PlanScreen;
