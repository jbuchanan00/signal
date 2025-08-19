
type NavbarHandle = {destroy: () => void}
type MountFn = (target: HTMLElement, props?: any) => NavbarHandle

export type NavbarModule = {
    TopNavInstance: MountFn,
    BottomNavInstance: MountFn
}

export async function loadNavbars(url = import.meta.env.VITE_NAVBAR_URL as string): Promise<NavbarModule> {
    const mod = await import(/*@vite-ignore*/ url.toLowerCase())
    return mod as NavbarModule
}