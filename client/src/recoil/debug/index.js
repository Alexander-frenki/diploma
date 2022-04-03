import { useEffect } from "react";
import { useRecoilSnapshot } from "recoil";

export function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.log(
        `%c ${node.key}`,
        "color: #ff7043",
        snapshot.getLoadable(node).contents
      );
    }
  }, [snapshot]);

  return null;
}
