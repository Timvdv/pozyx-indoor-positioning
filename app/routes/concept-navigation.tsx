import { ClientOnly, useHydrated } from "remix-utils";
import { PersonTracker } from "~/components/personTracker";
import usePozyx from "~/hooks/usePozyx";

export default function Index() {
  const hydrated = useHydrated();
  const posState = usePozyx();

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
