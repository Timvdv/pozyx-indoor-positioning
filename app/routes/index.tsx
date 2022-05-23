import { useEffect } from "react";
import { ClientOnly, useHydrated } from "remix-utils";
import { PersonTracker } from "~/components/personTracker";
import usePozyx from "~/hooks/usePozyx";

export default function Index() {
  const hydrated = useHydrated();
  const posState = usePozyx();

  useEffect( () => {

    // This should not be a empty array :(
    console.log(posState);

  }, [ posState ]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>

      {hydrated && (
        <ClientOnly fallback={<p>Loading...</p>}>
          {() => <PersonTracker posState={posState} />}
        </ClientOnly>
      )}

    </div>
  );
}
