
export type MountFunction = (target: HTMLElement, props?: any) => void;

export interface RemoteNavbars {
  TopNavInstance: MountFunction;
  BottomNavInstance: MountFunction;
}

export async function loadRemoteNavbars(url: string): Promise<RemoteNavbars> {
  // ESM file exported like your SvelteKit service
  const remote = await import(/* @vite-ignore */ url);
  return remote as RemoteNavbars;
}
