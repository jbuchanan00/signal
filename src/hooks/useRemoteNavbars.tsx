import { loadNavbars, type NavbarModule } from "../remote/loadNavbars"
import { useEffect, useRef } from "react"


type UseRemoteArgs = {
    which: keyof NavbarModule
    props?: Record<string, any>
    url?: string
}

export function useRemoteNavbar({which, props, url}: UseRemoteArgs){
    const ref = useRef<HTMLDivElement | null>(null)
    const destroyRef = useRef<null | (() => void)>(null)

    useEffect(() => {
        let cancelled = false
        let currentDestroy: null | (() => void) = null

        async function mountIt(){
            const container = ref.current
            if(!container) return

            const mod = await loadNavbars(url)
            const mountFn = mod[which]
            if (typeof mountFn !== "function"){
                console.error(`Remote did not export ${which}`)
                return
            }

            if(cancelled && currentDestroy){
                currentDestroy()
                destroyRef.current = null
            }
        }

        mountIt()

        return () => {
            cancelled = true
            if(currentDestroy){
                destroyRef.current = null
            }
        }
    }, [which, url, JSON.stringify(props)])

    return ref
}