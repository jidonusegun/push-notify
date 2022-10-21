import { useEffect } from 'react'
import './App.css';

const publicKey = 'BNgZPgqinBqkHBKtXdGU1xASx5GzjPoLLMP9QiXCV9RCBx-7jjHdb8ME1LFgNxhaVVoxTjrKGP6P9DuaYjUnXyg'

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function App() {
  // async function regWorker() {
  //   if (Notification.permission === 'granted') {
  //     navigator.serviceWorker.getRegistration().then(function(reg) {
  //       var options = {
  //         body: `Here is a notification from CoolR Dashboard ${new Date().toISOString()}`,
  //         icon: './coolr.png',
  //         vibrate: [100, 50, 100],
  //         data: {
  //           dateOfArrival: Date.now(),
  //           primaryKey: 1
  //         }
  //       };
  //       reg.showNotification('CoolR Group', options);
  //     });
  //   }
  // }

  // useEffect(() => {
  //   Notification.requestPermission()
  // },[])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     regWorker();
  //   }, 60000);
  //   return () => clearInterval(interval);
  // }, []);

  const regWorker = async() => {
   const sw = await navigator.serviceWorker.ready
   const push = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
    });
    console.log(push)
  }
  
  return (
      <main className="App">
        <h1>Push Notification</h1>
        <p>This page will trigger push notification every 1 minute</p>
        <button onClick={regWorker}>Push Button</button>
        <img src='./coolr.png' alt='CoolR Group' width="300px" height="300px" />
      </main>
  );
}

export default App;
