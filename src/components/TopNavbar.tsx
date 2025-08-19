import { useRemoteNavbar } from "../hooks/useRemoteNavbars";

type TopNavbarProps = {
    assetBase?: string
    [key: string]: any
}

export default function TopNavbar({assetBase, ...rest}: TopNavbarProps){
    const ref = useRemoteNavbar({
        which: "TopNavInstance",
        props: {assetBase, ...rest}
    })
    console.log(ref)
    return <div ref={ref}/>
}