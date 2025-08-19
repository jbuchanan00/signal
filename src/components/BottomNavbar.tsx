import { useRemoteNavbar } from "../hooks/useRemoteNavbars";

type BottomNavbarProps = {
    assetBase?: string
    [key: string]: any
}

export default function BottomNavbar({assetBase, ...rest}: BottomNavbarProps){
    const ref = useRemoteNavbar({
        which: "BottomNavInstance",
        props: {assetBase, ...rest}
    })

    return <div ref={ref} />
}