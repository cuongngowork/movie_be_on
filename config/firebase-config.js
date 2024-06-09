import admin from "firebase-admin";
console.log("NODE_ENV", process.env.NODE_ENV)
// import serviceAccount from "/etc/secrets/serviceAccount.json" assert { type: 'json' };
// import serviceAccount from "./serviceAccount.json" assert { type: 'json' };

async function loadServiceAccount() {
  let serviceAccount;

  if (process.env.NODE_ENV === 'development') {
    serviceAccount = await import('./serviceAccount.json', {
      assert: { type: 'json' }
    });
  } else if (process.env.NODE_ENV === 'production') {
    serviceAccount = await import('/etc/secrets/serviceAccount.json', {
      assert: { type: 'json' }
    });
  } else {
    throw new Error('NODE_ENV not set to development or production');
  }

  return serviceAccount.default;
}

loadServiceAccount().then(serviceAccount => {
  console.log('Service Account Loaded:', serviceAccount);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

}).catch(err => {
  console.error('Error loading service account:', err);
  process.exit(1);
});

export default admin