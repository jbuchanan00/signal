
import './App.css'
import TopNavbar from './components/TopNavbar'
import BottomNavbar from './components/BottomNavbar'
import { useEffect } from 'react'
import { loadNavbars } from './remote/loadNavbars'

function App() {
  useEffect(() => {
    let topDestroy: null | (() => void) = null
    let bottomDestroy: null | (() => void) = null
    let cancelled = false

    const fetchRemotes = async () => {
      try{
        const topNavElement = document.getElementById('top-nav')
        const bottomNavElement = document.getElementById('bottom-nav')
        const remote = await loadNavbars()
        if(cancelled) return
        if(topNavElement){
          const {destroy} = remote.TopNavInstance(topNavElement, {assetBase: import.meta.env.VITE_NAVBAR_ASSET_BASE + '/'})
          topDestroy = destroy
        } 
        if(bottomNavElement){
          const {destroy} = remote.BottomNavInstance(bottomNavElement, {assetBase: import.meta.env.VITE_NAVBAR_ASSET_BASE + '/'})
          bottomDestroy = destroy
        } 
      }catch(e){
        console.log('ERROR', e)
      }
    }

    fetchRemotes()

    return () => {
      cancelled = true
      if(topDestroy) topDestroy()
      if(bottomDestroy) bottomDestroy()
    }
  }, [])

  return (
    <>
      <div id='top-nav'></div>
      <div id='bottom-nav'></div>
    </>
  )
}

export default App
