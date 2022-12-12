import { useEffect, useState } from 'react'
import './App.css';

const publicKey = 'BNgZPgqinBqkHBKtXdGU1xASx5GzjPoLLMP9QiXCV9RCBx-7jjHdb8ME1LFgNxhaVVoxTjrKGP6P9DuaYjUnXyg';

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
  const [state, setState] = useState();

  const regWorker = async() => {
    navigator.serviceWorker.ready
    .then(reg => {
        reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey)
          }).then(sub => {
            setState(JSON.stringify(sub))
            fetch("https://push-notification-server-rho.vercel.app/subscribe", { method: "POST", body: JSON.stringify(sub), headers: { 'Content-Type': 'application/json' } })
            .then(res => res.text())
            .then(txt => console.log(txt))
            .catch(err => console.error(err));
          }, err => console.error(err));
    })
  } 

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const permission = await window.Notification.requestPermission()
      if (permission === 'granted') {
        regWorker();
      }
      
    }
    requestNotificationPermission();
    // window.safari​.pushNotification
  }, []);
  
  return (
      <main className="App">
        <h1>Push Notification Pop</h1>
        <button onClick={() => regWorker()}>Click</button>
        <p>This page will trigger push notification every 1 minute</p>
        <img src='./coolr.png' alt='CoolR Group' width="300px" height="300px" />
      </main>
  );
}

export default App;
